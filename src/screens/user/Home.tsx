import { FlatList, View } from "react-native";
import React from "react";
import { Slides, UserHeader, Categories } from "@components";
import { sharedStyles } from "@utils";

export function Home() {
  const scrollableData = [
    { key: "header", component: <UserHeader /> },
    { key: "slides", component: <Slides /> },
    { key: "categories", component: <Categories /> },
  ];

  return (
    <View style={sharedStyles.wrapper}>
      <FlatList
        data={scrollableData}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
