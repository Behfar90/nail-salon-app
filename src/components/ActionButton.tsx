import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "@utils";

export function ActionButton({
  label,
  isLoading = false,
  touchableStyle,
  textStyle,
  onPress,
}: {
  label: string;
  isLoading: boolean;
  touchableStyle?: any;
  textStyle?: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={touchableStyle} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
