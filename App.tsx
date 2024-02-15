import React from "react";
import { AuthStack, UserNavigation } from "@navigations";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import { UserProvider, useUserContext } from "@contexts";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </UserProvider>
  );
}

const Routes = () => {
  const { userData } = useUserContext();

  /* If user is logged in, show the user navigation, else show the auth stack */
  return userData?.id ? <UserNavigation /> : <AuthStack />;
};
