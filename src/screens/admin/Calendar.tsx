import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { colors } from "@utils";
import { DateData, CalendarList as DatePicker } from "react-native-calendars";
import { CustomHeader, DateDetails } from "@components/admin";
import { useCalendarAdmin } from "@hooks";

const theme = {
  todayTextColor: colors.primary,
  "stylesheet.calendar.header": {
    dayTextAtIndex5: {
      color: colors.red,
    },
    dayTextAtIndex6: {
      color: colors.red,
    },
  },
};

export function Calendar() {
  const {
    selected,
    setSelected,
    longSelectedRange,
    updateSelectRange,
    marked,
    initialDate,
    RANGE,
  } = useCalendarAdmin();

  const onDayPress = (day: DateData): void => {
    setSelected(day.dateString);
  };

  return (
    <View style={styles.wrapper}>
      <DatePicker
        style={styles.calendar}
        current={initialDate}
        onDayPress={onDayPress}
        onDayLongPress={(day) => updateSelectRange(day.dateString)}
        markedDates={marked}
        renderHeader={CustomHeader}
        markingType={"period"}
        onVisibleMonthsChange={(months) => {
          console.log("now these months are visible", months);
        }}
        firstDay={1}
        pastScrollRange={RANGE}
        futureScrollRange={RANGE}
        horizontal={true}
        pagingEnabled={true}
        showScrollIndicator={false}
        theme={theme}
        // calendarWidth={320}
      />

      <DateDetails date={selected} />
      {longSelectedRange.start && longSelectedRange.end && (
        <Text>
          Range has been selected from {longSelectedRange.start} to{" "}
          {longSelectedRange.end}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 60,
  },
  calendar: {
    height: Dimensions.get("window").height * 0.4,
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
