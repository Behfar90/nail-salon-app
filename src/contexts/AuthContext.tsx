import React, { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthenticationDataType {
  uid: string | null;
  phoneNumber?: string | null;
  isAuthenticationLoading: boolean;
  createdAt?: Date | null;
  lastloginAt?: Date | null;
}

export interface AuthContextPropsType {
  authData: AuthenticationDataType;
  updateAuthData: (payload: Partial<AuthenticationDataType>) => void;
}

const initialState: AuthenticationDataType = {
  uid: null,
  phoneNumber: null,
  isAuthenticationLoading: true,
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

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const storageAuthData = await AsyncStorage.getItem("storageAuthData");
        if (storageAuthData) {
          const user = JSON.parse(storageAuthData);
          setAuthData({
            uid: user?.uid ?? null,
            phoneNumber: user?.phoneNumber ?? null,
            isAuthenticationLoading: false,
            createdAt: new Date(Number(user?.createdAt)),
            lastloginAt: new Date(Number(user?.lastloginAt)),
          });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        AsyncStorage.getItem("storageAuthData").then((storageAuthData) => {
          if (!storageAuthData) {
            AsyncStorage.setItem("storageAuthData", JSON.stringify(user));
          }
        });
        setAuthData({
          uid: user?.uid ?? null,
          phoneNumber: user?.phoneNumber ?? null,
          isAuthenticationLoading: false,
          createdAt: new Date(Number(user?.createdAt)),
          lastloginAt: new Date(Number(user?.lastloginAt)),
        });
      } else {
        AsyncStorage.removeItem("storageAuthData");
        setAuthData({
          uid: null,
          phoneNumber: null,
          isAuthenticationLoading: false,
          createdAt: null,
          lastloginAt: null,
        });
      }
    });

    // Check authentication when the app starts
    checkAuthentication();

    return () => {
      // Unsubscribe from the auth state changes
      unsubscribe();
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
