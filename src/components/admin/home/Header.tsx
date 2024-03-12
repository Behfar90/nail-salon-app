import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useCalendarUser } from "@hooks";
import { useUserContext } from "@contexts";
import { colors, icons, strings } from "@utils";
import firebase from "@firebase/helpers";

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
        <TouchableOpacity onPress={() => firebase.signUserOut()}>
          {icons.LogoutIcon({ size: 30, color: colors.darkGray })}
        </TouchableOpacity>
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
