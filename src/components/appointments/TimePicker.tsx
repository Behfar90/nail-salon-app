import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors, strings } from "@utils";

const availableTimes = [
  "9:00",
  "10:30",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function TimePicker({
  calendar: { setTimeOnCurrentDate },
}: {
  calendar: any;
}) {
  const [selected, setSelected] = React.useState("");

  const timeBoxHandler = React.useCallback(
    (time: string, availableTimes: string[]) => {
      return (
        <View style={styles.timeContainer}>
          <Text style={{ fontWeight: "bold" }}>{time}</Text>
          <FlatList
            key={time}
            data={availableTimes}
            style={{ marginTop: 10 }}
            numColumns={4}
            renderItem={({ item }) => {
              const isSelected = selected === item + time;

              return (
                <TouchableOpacity
                  style={[
                    styles.timeBox,
                    isSelected ? styles.selectedTime : styles.unselectedTime,
                  ]}
                  onPress={() => {
                    setSelected(item + time);
                    const [hours, minutes] = item.split(":");
                    setTimeOnCurrentDate(Number(hours), Number(minutes));
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: isSelected ? colors.white : colors.black,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    },
    [availableTimes, selected]
  );

  return (
    <View style={styles.container}>
      {timeBoxHandler(strings.timePicker.morning, availableTimes)}
      {timeBoxHandler(strings.timePicker.afternoon, availableTimes)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    marginTop: 70,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGray,
    paddingTop: 10,
    // height: Dimensions.get("window").height * 0.1,
  },
  timeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 30,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  selectedTime: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.white,
  },
  unselectedTime: {
    backgroundColor: colors.transparent,
    borderColor: colors.lightGray,
  },
});
