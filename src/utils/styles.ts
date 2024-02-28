import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

export const sharedStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    position: "relative",
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  partialWrapper: {
    paddingHorizontal: 20,
  },
  actionButtonTouchable: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    height: 55,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: "700",
  },
});
