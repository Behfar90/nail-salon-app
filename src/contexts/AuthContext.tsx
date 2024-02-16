import React, { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@firebase/config";

export interface SignedUserDataType {
  uid: string | null;
  phoneNumber?: string | null;
  isLoading: boolean;
}

export interface AuthContextPropsType {
  authData: SignedUserDataType;
  updateAuthData: (payload: Partial<SignedUserDataType>) => void;
}

const initialState: SignedUserDataType = {
  uid: null,
  phoneNumber: null,
  isLoading: true,
};

const AuthContext = createContext<AuthContextPropsType>({
  authData: initialState,
  updateAuthData: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = React.useState<SignedUserDataType>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setAuthData({
        uid: user?.uid ?? null,
        phoneNumber: user?.phoneNumber ?? null,
        isLoading: false,
      });
    });
    return unsubscribe;
  }, []);

  const contextValue: AuthContextPropsType = React.useMemo(
    () => ({
      authData: authData,
      updateAuthData: (payload: Partial<SignedUserDataType>) => {
        setAuthData((prevAuthData) => ({
          ...prevAuthData,
          ...payload,
        }));
      },
    }),
    [authData, setAuthData]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
