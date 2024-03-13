import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { rangeType } from "@hooks";
import { strings } from "@utils";

export function DayTitle({
  date,
  longRange,
}: {
  date: string;
  longRange: rangeType;
}) {
  const isLongRangeSelected = longRange?.start.length && longRange?.end.length;
  const title = isLongRangeSelected
    ? strings.calendar.dateDetailsTitle1
    : strings.calendar.dateDetailsTitle2;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 14 }}>{title}</Text>
      {isLongRangeSelected ? (
        <Text style={{ fontSize: 16, fontWeight: "800" }}>
          {`${new Date(longRange.start).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })} - ${new Date(longRange.end).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`}
        </Text>
      ) : (
        <Text style={{ fontSize: 16, fontWeight: "800" }}>
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
