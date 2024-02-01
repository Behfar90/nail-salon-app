import { Text, TouchableOpacity } from "react-native";
import React from "react";

export function ActionButton({
  label,
  touchableStyle,
  textStyle,
  onPress,
}: {
  label: string;
  touchableStyle?: any;
  textStyle?: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={touchableStyle} onPress={onPress}>
      <Text style={textStyle}>{label} and sth</Text>
    </TouchableOpacity>
  );
}
