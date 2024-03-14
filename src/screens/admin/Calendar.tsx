import { View, StyleSheet, Dimensions, Text, FlatList } from "react-native";
import React from "react";
import { colors, sharedStyles, strings } from "@utils";
import { DateData, CalendarList as DatePicker } from "react-native-calendars";
import {
  CustomHeader,
  DayTitle,
  DayTimeRangePickers,
  DayBreaks,
  DaysOff,
} from "@components/admin";
import { useCalendarAdmin } from "@hooks";
import { ActionButton } from "@components/shared";

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
    resetSelectRange,
    getFormattedDate,
    marked,
    initialDate,
    RANGE,
    DEFAULT_DAY_DETAILS,
  } = useCalendarAdmin();
  const [data, setData] = React.useState(DEFAULT_DAY_DETAILS);

  const isLongRangeSelected = Boolean(
    longSelectedRange?.start.length && longSelectedRange?.end.length
  );

  const onDayPress = (day: DateData): void => {
    setSelected(day.dateString);
    resetSelectRange();
  };

  const selectedRangeWeekDays = (): { id: number; name: string }[] => {
    if (!selected && !isLongRangeSelected) return [];

    if (!isLongRangeSelected && selected)
      return [{ id: 0, name: getFormattedDate(selected, "EEEE").slice(0, 3) }];

    const rangeSelectedDays = Array.from(
      new Set(
        Object.keys(marked).map((day) =>
          getFormattedDate(day, "EEEE").slice(0, 3)
        )
      )
    );
    return rangeSelectedDays.map((day, index) => ({ id: index, name: day }));
  };

  const scrollableData = [
    {
      key: "dayTitle",
      component: <DayTitle date={selected} longRange={longSelectedRange} />,
    },
    {
      key: "dayTimeRangePickers",
      component: (
        <DayTimeRangePickers
          startsAt={data.startAt}
          endsAt={data.endAt}
          timeChangehandler={(newStartTime: string, newEndTime: string) =>
            setData({ ...data, startAt: newStartTime, endAt: newEndTime })
          }
        />
      ),
    },
    {
      key: "dayBreaks",
      component: (
        <DayBreaks
          dayStartsAt={data.startAt}
          breaks={data.breaks}
          breakRemover={(index) =>
            setData({
              ...data,
              breaks: data.breaks.filter((_, i) => i !== index),
            })
          }
          newBreakAdder={(newBreak) =>
            setData({ ...data, breaks: [...data.breaks, newBreak] })
          }
        />
      ),
    },
    {
      key: "daysOff",
      component: (
        <DaysOff
          weekDays={selectedRangeWeekDays()}
          isLongRangeSelected={isLongRangeSelected}
        />
      ),
    },
  ];

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

      {selected || isLongRangeSelected ? (
        <View style={styles.detailsContainer}>
          <FlatList
            data={scrollableData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => item.component}
            keyExtractor={(item) => item.key}
          />
          <ActionButton
            label={strings.calendar.saveText}
            onPress={() => console.log("save")}
            touchableStyle={sharedStyles.actionButtonTouchable}
            textStyle={sharedStyles.actionButtonText}
          />
        </View>
      ) : (
        <View style={styles.blankPage}>
          <Text>{strings.calendar.blankPagetext}</Text>
        </View>
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
    maxHeight: 400,
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
  detailsContainer: {
    height: Dimensions.get("window").height * 0.4,
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  blankPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
