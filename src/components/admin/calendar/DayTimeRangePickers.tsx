import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors, strings } from "@utils";
import { TimeBox } from "@components/shared";
import { TimerPickerModal } from "react-native-timer-picker";

export function DayTimeRangePickers({
  startsAt,
  endsAt,
  timeChangehandler,
}: {
  startsAt: string;
  endsAt: string;
  timeChangehandler: (newStartTime: string, newEndTime: string) => void;
}) {
  const [showStartTimePicker, setShowStartTimePicker] =
    React.useState<boolean>(false);
  const [showEndTimePicker, setShowEndTimePicker] =
    React.useState<boolean>(false);

  return (
    <View style={styles.dayTimesContainer}>
      <View style={styles.timeInputContainer}>
        <View>
          <Text style={styles.subHeader}>{strings.calendar.dateStartsAt}</Text>
          <TimeBox
            isSelected={true}
            label={startsAt}
            color={colors.tertiary}
            shape="rounded"
            selectHandler={() => setShowStartTimePicker(true)}
          />
          <TimerPickerModal
            visible={showStartTimePicker}
            setIsVisible={setShowStartTimePicker}
            initialHours={+startsAt.split(":")[0]}
            initialMinutes={+startsAt.split(":")[1]}
            onConfirm={(pickedDuration) => {
              const formattedHours = pickedDuration.hours
                .toString()
                .padStart(2, "0");
              const formattedMinutes = pickedDuration.minutes
                .toString()
                .padStart(2, "0");
              const newStartTime = `${formattedHours}:${formattedMinutes}`;
              timeChangehandler(newStartTime, endsAt);
              setShowStartTimePicker(false);
            }}
            modalTitle={strings.calendar.dateStartsAt}
            onCancel={() => setShowStartTimePicker(false)}
            closeOnOverlayPress
            styles={{
              theme: "dark",
            }}
            modalProps={{
              overlayOpacity: 0.7,
            }}
            hideSeconds
            hideCancelButton
          />
        </View>
        <View>
          <Text style={styles.subHeader}>{strings.calendar.dateEndsAt}</Text>
          <TimeBox
            isSelected={true}
            label={endsAt}
            color={colors.tertiary}
            shape="rounded"
            selectHandler={() => setShowEndTimePicker(true)}
          />
          <TimerPickerModal
            visible={showEndTimePicker}
            setIsVisible={setShowEndTimePicker}
            initialHours={+endsAt.split(":")[0]}
            initialMinutes={+endsAt.split(":")[1]}
            onConfirm={(pickedDuration) => {
              const formattedHours = pickedDuration.hours
                .toString()
                .padStart(2, "0");
              const formattedMinutes = pickedDuration.minutes
                .toString()
                .padStart(2, "0");
              const newEndTime = `${formattedHours}:${formattedMinutes}`;
              timeChangehandler(startsAt, newEndTime);
              setShowEndTimePicker(false);
            }}
            modalTitle={strings.calendar.dateEndsAt}
            onCancel={() => setShowEndTimePicker(false)}
            closeOnOverlayPress
            styles={{
              theme: "dark",
            }}
            modalProps={{
              overlayOpacity: 0.7,
            }}
            hideSeconds
            hideCancelButton
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayTimesContainer: {
    paddingHorizontal: 10,
  },
  timeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: "700",
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
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.white,
  },
});
