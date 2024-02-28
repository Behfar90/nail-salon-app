import { View } from "react-native";
import React from "react";
import { sharedStyles } from "@utils";
import { AdminHeader } from "@components";

export function Home() {
  return (
    <View style={sharedStyles.wrapper}>
      <AdminHeader />
    </View>
  );
}
