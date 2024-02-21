import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { icons } from "@utils";

export function ScreenHeader({ title }: { title: string }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {icons.BackIcon({ size: 30, color: "black" })}
      </TouchableOpacity>
      <Text style={{ fontSize: 25 }}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 10,
  },
});
