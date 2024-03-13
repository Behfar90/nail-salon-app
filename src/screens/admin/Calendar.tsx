import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { colors } from "@utils";
import { DateData, CalendarList as DatePicker } from "react-native-calendars";
import {
  CustomHeader,
  DayTitle,
  DayTimeRangePickers,
  DayBreaks,
} from "@components/admin";
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

const dummy = {
  startsAt: "09:30",
  endsAt: "18:00",
  breaks: [
    {
      from: "10:00",
      to: "11:00",
    },
    {
      from: "13:00",
      to: "14:00",
    },
  ],
};

interface DayAppointmentType {
  startsAt: string;
  endsAt: string;
  breaks: {
    from: string;
    to: string;
  }[];
}

export function Calendar() {
  const [data, setData] = React.useState<DayAppointmentType>(dummy);
  const {
    selected,
    setSelected,
    longSelectedRange,
    updateSelectRange,
    resetSelectRange,
    marked,
    initialDate,
    RANGE,
  } = useCalendarAdmin();

  const onDayPress = (day: DateData): void => {
    setSelected(day.dateString);
    resetSelectRange();
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

      <View style={styles.detailsContainer}>
        <DayTitle date={selected} longRange={longSelectedRange} />
        <DayTimeRangePickers
          startsAt={data.startsAt}
          endsAt={data.endsAt}
          timeChangehandler={(newStartTime: string, newEndTime: string) =>
            setData({ ...data, startsAt: newStartTime, endsAt: newEndTime })
          }
        />
        <DayBreaks
          dayStartsAt={data.startsAt}
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
      </View>
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
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
