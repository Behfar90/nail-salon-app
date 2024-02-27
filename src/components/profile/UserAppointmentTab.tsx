import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { colors, strings } from "@utils";

export function UserAppointmentTab({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveIndex(0)}
          style={[activeIndex === 0 ? styles.activeTab : styles.inActiveTab]}
        >
          <Text
            style={{
              color: activeIndex === 0 ? colors.white : colors.gray,
            }}
          >
            {strings.profile.userInformationTab}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveIndex(1)}
          style={[activeIndex === 1 ? styles.activeTab : styles.inActiveTab]}
        >
          <Text
            style={{
              color: activeIndex === 1 ? colors.white : colors.gray,
            }}
          >
            {strings.profile.appointmentHistoryTab}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    padding: 3,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.4,
  },
  inActiveTab: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    padding: 3,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.4,
  },
});
