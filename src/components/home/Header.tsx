import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useAuthContext } from "@contexts";
import { colors, icons, strings } from "@utils";
import firebase from "@firebase/helpers";

export function Header() {
  const { authData } = useAuthContext();

  const displayName =
    authData.displayName ?? firebase.getCurrentUserDisplayName();

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 20 }}>
            {strings.header.mainHeading}{" "}
            <Text style={{ fontWeight: "bold" }}>{displayName}</Text> 👋
          </Text>
          <Text style={styles.subHeader}>{strings.header.subHeading}</Text>
        </View>
        {icons.NotificationIcon({ size: 26, color: colors.darkGray })}
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
