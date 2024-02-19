import React, { createContext, useContext, useMemo, useState } from "react";

export interface SignedUserDataType {
  uid: string | null;
  name?: string | null;
  role?: "admin" | "user";
  isUserLoading: boolean;
}

export interface UserContextPropsType {
  userData: SignedUserDataType;
  updateUserData: (payload: Partial<SignedUserDataType>) => void;
}

const initialState: SignedUserDataType = {
  uid: null,
  name: null,
  role: "user",
  isUserLoading: true,
};

const UserContext = createContext<UserContextPropsType>({
  userData: initialState,
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
  const [userData, setUserData] = useState<SignedUserDataType>(
    initialState as SignedUserDataType
  );

  const contextValue: UserContextPropsType = useMemo(
    () => ({
      userData,
      updateUserData: (payload: Partial<SignedUserDataType>) => {
        setUserData((prev) => ({ ...prev, ...payload }));
      },
    }),
    [userData]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
