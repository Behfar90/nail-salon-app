import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";
import { colors, strings } from "@utils";

export function DaysOff({
  weekDays,
  isLongRangeSelected,
}: {
  weekDays: { id: number; name: string }[];
  isLongRangeSelected: boolean;
}) {
  const [selectedDays, setSelectedDays] = React.useState<string[]>([]);

  const toggleDaySelection = (dayId: string) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter((id) => id !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const renderDayCheckbox = ({
    item,
  }: {
    item: { id: string; name: string };
  }) => (
    <View style={{ paddingLeft: weekDays.length === 1 ? 10 : 0 }}>
      <CheckBox
        value={selectedDays.includes(item.id)}
        color={colors.tertiary}
        onValueChange={() => toggleDaySelection(item.id)}
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
