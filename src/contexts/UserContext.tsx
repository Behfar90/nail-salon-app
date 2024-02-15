import React, { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@firebase/config";

export interface UserDataType {
  id: string | null;
  name: string | null;
  phoneNumber?: string | null;
  role: "admin" | "user" | null;
  isLoading: boolean;
}

export interface UserContextPropsType {
  userData: UserDataType;
  updateUserData: (payload: Partial<UserDataType>) => void;
}

const UserContext = createContext<UserContextPropsType>({
  userData: {
    id: null,
    name: null,
    phoneNumber: null,
    role: null,
    isLoading: false,
  },
  updateUserData: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = React.useState<UserDataType>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUserData({
        id: user?.uid ?? null,
        name: user?.displayName ?? null,
        phoneNumber: user?.phoneNumber ?? null,
        role: "user",
        isLoading: false,
      });
    });
    return unsubscribe;
  }, []);

  const contextValue: UserContextPropsType = React.useMemo(
    () => ({
      userData: userData,
      updateUserData: (payload: Partial<UserDataType>) =>
        setUserData((prevUserData) => ({
          ...prevUserData,
          ...payload,
        })),
    }),
    [userData, setUserData]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
