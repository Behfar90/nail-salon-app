import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Start, Register } from "@screens";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Start} />
      {/* <Stack.Screen name="Register" component={Register} /> */}
    </Stack.Navigator>
  );
}
