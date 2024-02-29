import { View } from "react-native";
import React from "react";
import { sharedStyles } from "@utils";
import { Header, Slices } from "@components/admin";

export function Home() {
  return (
    <View style={sharedStyles.wrapper}>
      <Header />
      <Slices />
    </View>
  );
}
