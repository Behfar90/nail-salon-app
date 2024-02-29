import React from "react";
import { AuthStack, RoleStack } from "@navigations";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import { AuthProvider, UserProvider, useAuthContext } from "@contexts";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}

const Routes = () => {
  const { authData } = useAuthContext();

  /* If user is logged in, show the user navigation, else show the auth stack */
  return authData?.uid && !authData.isLoading ? (
    <UserProvider>
      <RoleStack />
    </UserProvider>
  ) : (
    <AuthStack />
  );
};
