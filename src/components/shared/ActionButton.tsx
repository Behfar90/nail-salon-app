import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "@utils";

export function ActionButton({
  id,
  label,
  isLoading = false,
  touchableStyle,
  textStyle,
  onPress,
}: {
  id?: string;
  label: string;
  isLoading?: boolean;
  touchableStyle?: any;
  textStyle?: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity id={id} style={touchableStyle} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
