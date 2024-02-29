import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { colors, sharedStyles } from "@utils";
import { Calendar as DatePicker } from "react-native-calendars";

export function Calendar() {
  const [selected, setSelected] = React.useState<null | number>(null);
  return (
    <View style={sharedStyles.wrapper}>
      <DatePicker
        onDayPress={(day) => {
          setSelected(day.timestamp);
        }}
        theme={{
          calendarBackground: colors.white,
        }}
        style={styles.calendar}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: colors.primary,
          },
        }}
      />
      <Text>{selected}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 15,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
