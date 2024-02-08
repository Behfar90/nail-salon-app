import React, { createContext, useContext } from "react";
// import { useUser } from "@clerk/clerk-expo";

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

const UserContext = createContext<UserContextPropsType>({
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

export const UserProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = React.useState<UserDataType | null>(null);
  // const { isSignedIn, user } = useUser();

  React.useEffect(() => {
    // if (isSignedIn) {
    // setUserData({
    //   id: user.id,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.primaryEmailAddress?.emailAddress ?? null,
    //   role: user.publicMetadata?.role ?? "user",
    //   imageUrl: user.imageUrl,
    // });
    // }
  }, []);

  const contextValue: UserContextPropsType = React.useMemo(
    () => ({ userData: userData, setUserData: setUserData }),
    [userData, setUserData]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
