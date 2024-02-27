import { View, Text, StyleSheet } from "react-native";
import React from "react";

export function AppointmentHistory() {
  return (
    <View style={styles.container}>
      <Text>Appointment History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
