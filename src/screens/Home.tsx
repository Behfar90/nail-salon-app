import { View, Text } from "react-native";
import React from "react";
import { useUserContext } from "@contexts";

export function Home() {
  const { userData } = useUserContext();
  console.log(userData);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
