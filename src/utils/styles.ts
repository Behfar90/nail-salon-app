import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const sharedStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    position: "relative",
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});
