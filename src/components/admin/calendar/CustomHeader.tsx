import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@utils";

export function CustomHeader(date: Date) {
  const header = date.toString("MMMM yyyy");
  const [month, year] = header.split(" ");

  return (
    <View style={styles.header}>
      <Text style={[styles.month, styles.headerTextStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, styles.headerTextStyle]}>{year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.7,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    color: colors.primary,
    paddingRight: 5,
  },
  month: {
    marginLeft: 5,
  },
  year: {
    marginRight: 5,
  },
});
