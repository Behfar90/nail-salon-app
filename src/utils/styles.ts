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
  elevatedView: {
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 15,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
