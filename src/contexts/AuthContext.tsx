import React, { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SignedUserDataType {
  uid: string | null;
  phoneNumber?: string | null;
  isLoading: boolean;
  createdAt?: Date | null;
  lastloginAt?: Date | null;
}

export interface AuthContextPropsType {
  authData: SignedUserDataType;
  updateAuthData: (payload: Partial<SignedUserDataType>) => void;
}

const initialState: SignedUserDataType = {
  uid: null,
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
  const [authData, setAuthData] = React.useState<SignedUserDataType>(null);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const user = JSON.parse(userData);
          setAuthData({
            uid: user?.uid ?? null,
            phoneNumber: user?.phoneNumber ?? null,
            isLoading: false,
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
        AsyncStorage.getItem("userData").then((userData) => {
          if (!userData) {
            AsyncStorage.setItem("userData", JSON.stringify(user));
          }
        });
        setAuthData({
          uid: user?.uid ?? null,
          phoneNumber: user?.phoneNumber ?? null,
          isLoading: false,
          createdAt: new Date(Number(user?.createdAt)),
          lastloginAt: new Date(Number(user?.lastloginAt)),
        });
      } else {
        AsyncStorage.removeItem("userData");
        setAuthData({
          uid: null,
          phoneNumber: null,
          isLoading: false,
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
