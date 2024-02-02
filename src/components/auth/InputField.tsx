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
  inputValue,
  inputChangeHandler,
  keyboardType,
  autoCompleteType,
  fieldButtonLabel,
  fieldButtonClickHandler,
}: {
  label: string;
  icon: React.ReactNode;
  inputType?: string;
  inputValue?: string;
  inputChangeHandler?: (arg0?: any) => void;
  keyboardType?: any;
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
