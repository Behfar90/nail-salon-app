import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useUserContext } from "@contexts";
import { colors, icons } from "@utils";

export function Header() {
  const { userData } = useUserContext();
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 20 }}>Hello {userData.name} 👋</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
  },
});
