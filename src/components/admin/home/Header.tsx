import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useCalendarUser } from "@hooks";
import { useUserContext } from "@contexts";
import { colors, strings } from "@utils";

export function Header() {
  const { currentDate, getFormattedDate } = useCalendarUser();
  const { userData } = useUserContext();

  const adminName = userData?.name ?? "Admin";

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 20 }}>
            {strings.headerAdmin.mainHeading}{" "}
            <Text style={{ fontWeight: "bold" }}>{adminName}</Text> 👋
          </Text>
          <Text style={styles.subHeader}>
            {strings.headerAdmin.subHeading}
            {getFormattedDate(currentDate, "dd, LLLL yyyy")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeader: {
    color: colors.darkGray,
    fontSize: 14,
    marginTop: 5,
  },
});
