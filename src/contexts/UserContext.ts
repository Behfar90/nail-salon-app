import React, { createContext, useContext } from "react";

export interface UserDataType {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: "admin" | "user" | null;
  imageUrl?: string | null;
}

export interface UserContextPropsType {
  userData: UserDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType | null>>;
}

export const UserContext = createContext<UserContextPropsType>({
  userData: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    imageUrl: null,
  },
  setUserData: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
