import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, icons, sharedStyles } from "@utils";

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
    <SafeAreaView style={[sharedStyles.partialWrapper, styles.container]}>
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
    width: "100%",
    marginVertical: Dimensions.get("window").height * 0.01,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
