import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { colors } from "@utils";

const DAY_WIDTH =
  Dimensions.get("screen").width * 0.12 > 45
    ? Dimensions.get("screen").width * 0.12
    : 45;
const DAY_HEIGHT = 70;
const DAY_OFFSET = DAY_WIDTH;

export function DatePicker({
  calendar: {
    getCurrentMonthName,
    getCurrentMonthDays,
    getFirstDayOfTheWeek,
    getFormattedDate,
    areDatesSameDay,
    currentDate,
    setCurrentDate,
  },
}: {
  calendar: any;
}) {
  const monthDays: Date[] = React.useMemo(
    () => getCurrentMonthDays(),
    [getCurrentMonthDays, currentDate]
  );

  const firstDayOfTheWeekIndex: number = React.useMemo(
    () => Number(getFormattedDate(getFirstDayOfTheWeek(currentDate), "dd")),
    [getFirstDayOfTheWeek, currentDate]
  );

  const renderItemDays = ({ item, index }: { item: Date; index: number }) => {
    const isSelected = areDatesSameDay(item, currentDate);

    const dayNumber = item.getDate();
    const dayString = getFormattedDate(item, "EEE");
    return (
      <TouchableOpacity
        onPress={() => setCurrentDate(item)}
        style={styles.weekDay}
      >
        <Text style={styles.weekDayStr}>{dayString}</Text>
        <View
          style={[
            styles.weekDayNum,
            isSelected ? { backgroundColor: colors.white } : {},
          ]}
        >
          <Text style={{ color: isSelected ? colors.primary : colors.white }}>
            {dayNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.monthStr}>{getCurrentMonthName()}</Text>
      </View>
      <FlatList
        data={monthDays}
        keyExtractor={(item) => item.toDateString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: DAY_WIDTH,
          offset: DAY_OFFSET * index,
          index,
        })}
        initialScrollIndex={firstDayOfTheWeekIndex}
        initialNumToRender={1}
        renderItem={renderItemDays}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  monthStr: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    color: colors.white,
  },
  weekDay: {
    width: DAY_WIDTH,
    height: DAY_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
  },
  weekDayStr: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.white,
  },
  weekDayNum: {
    fontSize: 14,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
