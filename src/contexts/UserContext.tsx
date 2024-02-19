import firebase from "@firebase/helpers";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";

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
  const { authData } = useAuthContext();
  const [userData, setUserData] = useState<SignedUserDataType>(
    initialState as SignedUserDataType
  );

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataFromDB = await firebase.getUserDataFromDB(authData.uid);
        setUserData({
          uid: userDataFromDB?.uid ?? null,
          name: userDataFromDB?.name ?? null,
          role: userDataFromDB?.isAdmin ? "admin" : "user",
          isUserLoading: false,
        });
      } catch (error) {
        // Handle error (e.g., log it or set an error state)
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, []);

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
