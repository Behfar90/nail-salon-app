import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";
import { colors, strings } from "@utils";

export function DaysOff({
  weekDays,
  isLongRangeSelected,
  offDays,
  offDaysToggler,
}: {
  weekDays: { id: number; name: string }[];
  isLongRangeSelected: boolean;
  offDays: string[];
  offDaysToggler: (dayId: string) => void | ((prevState: string[]) => string[]);
}) {
  const renderDayCheckbox = ({
    item,
  }: {
    item: { id: string; name: string };
  }) => (
    <View style={{ paddingLeft: weekDays.length === 1 ? 10 : 0 }}>
      <CheckBox
        value={offDays.includes(item.id)}
        color={colors.tertiary}
        onValueChange={() => offDaysToggler(item.id)}
      />
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>{strings.calendar.daysOffText}</Text>

      <FlatList<{ id: string; name: string }>
        data={weekDays}
        renderItem={renderDayCheckbox}
        numColumns={7}
        columnWrapperStyle={{
          justifyContent: isLongRangeSelected ? "space-around" : "flex-start",
        }}
        keyExtractor={(item) => item.id}
      />
      <Text>{offDays}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "700",
  },
});
