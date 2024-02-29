import React, { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@firebase/config";
import { useLoadingTime } from "@hooks";

export interface AuthenticationDataType {
  uid: string | null;
  displayName?: string | null;
  phoneNumber?: string | null;
  isLoading: boolean;
  createdAt?: Date | null;
  lastloginAt?: Date | null;
}

export interface AuthContextPropsType {
  authData: AuthenticationDataType;
  updateAuthData: (payload: Partial<AuthenticationDataType>) => void;
}

const initialState: AuthenticationDataType = {
  uid: null,
  displayName: null,
  phoneNumber: null,
  isLoading: true,
  createdAt: null,
  lastloginAt: null,
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
  const [authData, setAuthData] = React.useState<AuthenticationDataType>(
    initialState as AuthenticationDataType
  );
  const { startTracking, stopTracking, getActualLoadingTime } =
    useLoadingTime();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      startTracking();

      if (user) {
        setAuthData({
          ...authData,
          uid: user?.uid ?? null,
          displayName: user?.displayName ?? null,
          phoneNumber: user?.phoneNumber ?? null,
          createdAt: new Date(Number(user.metadata.createdAt)),
          lastloginAt: new Date(Number(user.metadata.lastloginAt)),
        });

        const actualLoadingTime = getActualLoadingTime();

        // To make sure the loading spinner is shown for at least 1 second
        if (actualLoadingTime < 1000) {
          setTimeout(() => {
            setAuthData((prevAuthData) => ({
              ...prevAuthData,
              isLoading: false,
            }));
          }, 1000 - actualLoadingTime);
        }
      } else {
        setAuthData({
          uid: null,
          phoneNumber: null,
          isLoading: false,
          createdAt: null,
          lastloginAt: null,
        });
      }
    });

    return () => {
      // Unsubscribe from the auth state changes
      unsubscribe();
      stopTracking();
    };
  }, []);

  const contextValue: AuthContextPropsType = React.useMemo(
    () => ({
      authData: authData,
      updateAuthData: (payload: Partial<AuthenticationDataType>) => {
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
