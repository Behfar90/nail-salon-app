import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthStack } from "@navigations";
import { colors } from "@utils";

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});
