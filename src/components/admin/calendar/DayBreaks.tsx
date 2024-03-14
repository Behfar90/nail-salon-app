import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors, icons, strings } from "@utils";
import { TimerPickerModal } from "react-native-timer-picker";
import { ActionButton, TimeBox } from "@components/shared";

export function DayBreaks({
  dayStartsAt,
  breaks,
  breakRemover,
  newBreakAdder,
}: {
  dayStartsAt: string;
  breaks: { from: string; to: string }[];
  breakRemover: (index: number) => void;
  newBreakAdder: (newBreak: { from: string; to: string }) => void;
}) {
  const [showBreakStartingTimePicker, setShowBreakStartingTimePicker] =
    React.useState<boolean>(false);
  const [showBreakEndingTimePicker, setShowBreakEndingTimePicker] =
    React.useState<boolean>(false);
  const [newBreakFrom, setNewBreakFrom] = React.useState<string>(dayStartsAt);

  const noBreaksComponent = () => (
    <View style={styles.noBreak}>
      <Text>{strings.calendar.noBreaksText}...</Text>
    </View>
  );

  const sortedBreaks = [...breaks].sort((a, b) => a.from.localeCompare(b.from));

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.subHeader}>
          {strings.calendar.breaksText}{" "}
          {breaks.length ? `(${breaks.length})` : ""}
        </Text>
        <ActionButton
          label={strings.calendar.addBreakText}
          onPress={() => setShowBreakStartingTimePicker(true)}
          textStyle={styles.addBreak}
          touchableStyle={styles.addBreakTouchable}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={sortedBreaks}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          ListEmptyComponent={noBreaksComponent}
          renderItem={({ item, index }) => (
            <View style={styles.breakContainer}>
              <TimeBox
                isSelected={true}
                label={`${item.from} - ${item.to}`}
                color={colors.tertiary}
                shape="rounded"
              />
              <TouchableOpacity onPress={() => breakRemover(index)}>
                {icons.CloseCircleIcon({ size: 24, color: colors.gray })}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <TimerPickerModal
        visible={showBreakStartingTimePicker}
        setIsVisible={setShowBreakStartingTimePicker}
        initialHours={+newBreakFrom.split(":")[0]}
        initialMinutes={+newBreakFrom.split(":")[1]}
        onConfirm={(pickedDuration) => {
          const formattedHours = pickedDuration.hours
            .toString()
            .padStart(2, "0");
          const formattedMinutes = pickedDuration.minutes
            .toString()
            .padStart(2, "0");
          const newStartTime = `${formattedHours}:${formattedMinutes}`;
          setNewBreakFrom(newStartTime);
          setShowBreakStartingTimePicker(false);
          setShowBreakEndingTimePicker(true);
        }}
        modalTitle={strings.calendar.breakStartsAt}
        onCancel={() => setShowBreakStartingTimePicker(false)}
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

      <TimerPickerModal
        visible={showBreakEndingTimePicker}
        setIsVisible={setShowBreakEndingTimePicker}
        initialHours={+newBreakFrom.split(":")[0] + 1}
        initialMinutes={+newBreakFrom.split(":")[1]}
        onConfirm={(pickedDuration) => {
          const formattedHours = pickedDuration.hours
            .toString()
            .padStart(2, "0");
          const formattedMinutes = pickedDuration.minutes
            .toString()
            .padStart(2, "0");
          const newEndTime = `${formattedHours}:${formattedMinutes}`;
          const newBreak = { from: newBreakFrom, to: newEndTime };
          newBreakAdder(newBreak);
          setShowBreakEndingTimePicker(false);
          setNewBreakFrom("");
        }}
        modalTitle={strings.calendar.breakEndsAt}
        onCancel={() => setShowBreakEndingTimePicker(false)}
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: "700",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBreakTouchable: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addBreak: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "italic",
  },

  breakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 1,
  },
  noBreak: {
    padding: 10,
  },
});
