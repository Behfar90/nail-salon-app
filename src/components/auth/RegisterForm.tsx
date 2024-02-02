import { InputField, ActionButton } from "@components";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { colors } from "@utils";

export function RegisterForm({
  PendinVerificationToggler,
  isSignUpLoaded,
  signUp,
}: {
  PendinVerificationToggler: (arg0: boolean) => void;
  isSignUpLoaded: boolean;
  signUp: any;
}) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const fullNameIcon = (
    <Ionicons name="person-outline" size={20} color={colors.darkGray} />
  );

  const emailIcon = (
    <MaterialIcons name="alternate-email" size={20} color={colors.darkGray} />
  );

  const phoneIcon = (
    <MaterialIcons name="phone" size={20} color={colors.darkGray} />
  );

  const passwordIcon = (
    <Ionicons name="lock-closed-outline" size={20} color={colors.darkGray} />
  );

  const onRegisterPress = async () => {
    setIsLoading(true);
    if (!isSignUpLoaded) {
      return;
    }
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      PendinVerificationToggler(true);
    } catch (error: any) {
      Alert.alert(error.errors[0].longMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <InputField
        label={"First Name"}
        icon={fullNameIcon}
        autoCompleteType={"given-name"}
        inputValue={firstName}
        inputChangeHandler={setFirstName}
      />
      <InputField
        label={"Last Name"}
        icon={fullNameIcon}
        autoCompleteType={"family-name"}
        inputValue={lastName}
        inputChangeHandler={setLastName}
      />
      <InputField
        label={"Email Address"}
        icon={emailIcon}
        keyboardType={"email-address"}
        autoCompleteType="email"
        inputType={email}
        inputChangeHandler={setEmail}
      />
      <InputField
        label={"Password"}
        icon={passwordIcon}
        inputType="password"
        autoCompleteType={"off"}
        inputValue={password}
        inputChangeHandler={setPassword}
      />
      <InputField
        label={"Confirm Password"}
        icon={passwordIcon}
        inputType="password"
        autoCompleteType={"off"}
        inputValue={confirmPassword}
        inputChangeHandler={setConfirmPassword}
      />

      <ActionButton
        label={"Register"}
        onPress={onRegisterPress}
        touchableStyle={styles.registerBtn}
        textStyle={styles.registerBtnText}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  registerBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  registerBtnText: {
    color: colors.white,
    fontWeight: "700",
  },
});
