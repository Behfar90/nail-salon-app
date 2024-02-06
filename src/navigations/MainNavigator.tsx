import React from "react";
import { ActivityIndicator } from "react-native";
import { useUserContext } from "@contexts";
import { AdminNavigation, UserNavigation } from "@navigations";

export function MainNavigator() {
  const { userData } = useUserContext();
  if (!userData) {
    return <ActivityIndicator size="large" />;
  }

  return userData.role === "admin" ? <AdminNavigation /> : <UserNavigation />;
}
