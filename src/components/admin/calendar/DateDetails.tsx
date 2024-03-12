import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { colors } from "@utils";
import { TimeBox } from "@components/shared";

const dummy = {
  startsAt: "09:00",
  endsAt: "18:00",
  breaks: [
    {
      startsAt: "10:00",
      endsAt: "11:00",
    },
    {
      startsAt: "13:00",
      endsAt: "14:00",
    },
  ],
};

export function DateDetails({ date }: { date: string }) {
  const noBreaksComponent = () => (
    <View>
      <Text>No breaks</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text>
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.dayTimesContainer}>
        <View style={styles.timeInputContainer}>
          <View>
            <Text>Day starts at</Text>
            <TimeBox
              isSelected={true}
              label={dummy.startsAt}
              color={colors.tertiary}
              shape="rounded"
              selectHandler={() => console.log("pressed")}
            />
          </View>
          <View>
            <Text>Day ends at</Text>
            <TimeBox
              isSelected={true}
              label={dummy.endsAt}
              color={colors.tertiary}
              shape="rounded"
              selectHandler={() => console.log("pressed")}
            />
          </View>
        </View>
        <View>
          <Text>Breaks</Text>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              data={dummy.breaks}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              ListEmptyComponent={noBreaksComponent}
              renderItem={({ item }) => (
                <TimeBox
                  isSelected={true}
                  label={`${item.startsAt} - ${item.endsAt}`}
                  color={colors.tertiary}
                  shape="rounded"
                  selectHandler={() => console.log("pressed")}
                />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dayTimesContainer: {
    marginTop: 20,
  },
  timeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
