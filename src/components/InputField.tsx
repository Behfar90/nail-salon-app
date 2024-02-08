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
  autoFocus = false,
  inputType,
  inputValue,
  inputChangeHandler,
  keyboardType = "default",
  autoCompleteType,
  fieldButtonLabel,
  fieldButtonClickHandler,
}: {
  label: string;
  icon: React.ReactNode;
  autoFocus?: boolean;
  inputType?: string;
  inputValue?: string;
  inputChangeHandler?: (arg0?: any) => void;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  autoCompleteType?: any;
  fieldButtonLabel?: string;
  fieldButtonClickHandler?: () => void;
}) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {icon}
      {inputType === "password" ? (
        <TextInput
          placeholder={label}
          value={inputValue}
          autoFocus={autoFocus}
          onChangeText={inputChangeHandler}
          keyboardType={keyboardType}
          autoComplete={autoCompleteType}
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      ) : (
        <TextInput
          placeholder={label}
          autoFocus={autoFocus}
          value={inputValue}
          autoCapitalize="none"
          autoComplete={autoCompleteType}
          onChangeText={inputChangeHandler}
          keyboardType={keyboardType}
          style={styles.input}
        />
      )}
      <TouchableOpacity onPress={fieldButtonClickHandler}>
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
