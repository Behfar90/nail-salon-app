import { colors } from "@utils";
import { max } from "date-fns";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  KeyboardTypeOptions,
} from "react-native";

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  autoFocus?: boolean;
  inputType?: string;
  inputValue?: string;
  maxHeight?: number;
  marginTop?: number;
  inputChangeHandler?: (arg0?: any) => void;
  keyboardType?: KeyboardTypeOptions;
  autoCompleteType?: any;
  fieldButtonLabel?: string;
  fieldButtonClickHandler?: () => void;
}

export function InputField({
  label,
  icon,
  autoFocus = false,
  inputType,
  inputValue,
  maxHeight,
  marginTop,
  inputChangeHandler,
  keyboardType = "default",
  autoCompleteType,
  fieldButtonLabel,
  fieldButtonClickHandler,
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.container,
        { maxHeight: maxHeight ?? null, marginTop: marginTop ?? 0 },
      ]}
    >
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
    flex: 1,
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
