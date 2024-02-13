import React from "react";
import { AuthStack, UserNavigation } from "@navigations";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthState } from "@hooks";
import { User } from "firebase/auth";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  const user: User | null = useAuthState();

  if (user == null) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <UserNavigation />
    </NavigationContainer>
  );
}
