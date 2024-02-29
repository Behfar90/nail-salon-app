import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { ReactNode } from "react";
import { colors } from "@utils";

export function UserInfo({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.8,
    gap: 20,
    // borderWidth: 1,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 30,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  titleText: {
    color: colors.gray,
  },
  valueText: {
    color: colors.darkGray,
    fontWeight: "bold",
    fontSize: 18,
  },
});
