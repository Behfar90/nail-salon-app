import { FlatList, View } from "react-native";
import React from "react";
import { sharedStyles } from "@utils";
import { Header, Notification, Slides, UsersList } from "@components/admin";

export function Home() {
  const scrollableData = [
    { key: "header", component: <Header /> },
    { key: "slides", component: <Slides /> },
    { key: "usersList", component: <UsersList /> },
    { key: "notification", component: <Notification /> },
  ];

  return (
    <View style={sharedStyles.wrapper}>
      <FlatList
        data={scrollableData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
