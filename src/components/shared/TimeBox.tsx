import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@utils";
import { BackgroundImage } from "@rneui/themed/dist/config";

type TimeBoxShape = "rectangular" | "rounded";

export function TimeBox({
  isSelected,
  label,
  selectHandler,
  color = colors.primary,
  shape = "rectangular",
}: {
  isSelected: boolean;
  label: string;
  selectHandler: () => void;
  color?: string;
  shape?: TimeBoxShape;
}) {
  const boxColor = {
    backgroundColor: isSelected ? color : colors.transparent,
    borderColor: isSelected ? color : colors.lightGray,
  };

  const boxShape = {
    borderRadius: shape === "rounded" ? 20 : 5,
  };

  return (
    <TouchableOpacity
      style={[styles.timeBox, boxColor, boxShape]}
      onPress={selectHandler}
    >
      <Text
        style={{
          fontSize: 12,
          color: isSelected ? colors.white : colors.black,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  timeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 55,
    height: 30,
    paddingHorizontal: 5,
    borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 5,
  },
});
