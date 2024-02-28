import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Start } from "@screens/auth";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={Start} />
    </Stack.Navigator>
  );
}
