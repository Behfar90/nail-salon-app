import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, icons } from "@utils";

export function ScreenHeader({
  title,
  color,
}: {
  title: string;
  color?: string;
}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {icons.BackIcon({ size: 30, color: color ?? colors.black })}
      </TouchableOpacity>
      <Text style={[styles.header, { color: color }]}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
