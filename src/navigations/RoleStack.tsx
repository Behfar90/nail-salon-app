import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserNavigation } from "./UserNavigation";
import { AdminNavigation } from "./AdminNavigation";
import { useUserContext } from "@contexts";
import { ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

export function RoleStack() {
  const { userData } = useUserContext();

  console.log("RoleStack", userData.role, userData.isUserLoading);

  if (userData.isUserLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData.role === "user" ? (
        <Stack.Screen name="UserNavigation" component={UserNavigation} />
      ) : (
        <Stack.Screen name="AdminNavigation" component={AdminNavigation} />
      )}
    </Stack.Navigator>
  );
}
