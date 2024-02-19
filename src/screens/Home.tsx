import { ScrollView } from "react-native";
import React from "react";
import { Header } from "@components";
import { sharedStyles } from "@utils";

export function Home() {
  return (
    <ScrollView style={sharedStyles.wrapper}>
      <Header />
    </ScrollView>
  );
}
