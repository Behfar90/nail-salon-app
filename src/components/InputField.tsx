import { colors } from "@utils";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

export function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}: {
  label: string;
  icon: React.ReactNode;
  inputType?: string;
  keyboardType?: any;
  fieldButtonLabel?: string;
  fieldButtonFunction?: any;
}) {
  return (
    <KeyboardAvoidingView style={styles.container}>
      {icon}
      {inputType === "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.input}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.input}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={styles.fieldButtonLabel}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  fieldButtonLabel: {
    color: colors.primary,
    fontWeight: "700",
  },
});
