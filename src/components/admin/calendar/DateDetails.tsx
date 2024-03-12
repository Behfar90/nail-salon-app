import { View, Text } from "react-native";
import React from "react";

export function DateDetails({ date }: { date: string }) {
  return (
    <View>
      <Text>{new Date(date).toDateString()}</Text>
    </View>
  );
}
