import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, icons } from "@utils";

export function ScreenHeader({
  title,
  color,
  goBack = true,
}: {
  title: string;
  color?: string;
  goBack?: boolean;
}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {goBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {icons.BackCircleIcon({ size: 30, color: color ?? colors.black })}
        </TouchableOpacity>
      )}
      <Text style={[styles.header, { color: color }]}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
