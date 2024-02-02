import { InputField, ActionButton } from "@components";
import React from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { colors } from "@utils";
import { useSignUp } from "@clerk/clerk-expo";

export function RegisterForm() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

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
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.create({
        fullName,
        emailAddress: email,
        password,
      });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (error: any) {
      Alert.alert(error.errors[0].longMessage);
    }
  };

  return (
    <View>
      {!pendingVerification && (
        <View>
          <InputField
            label={"Full Name"}
            icon={fullNameIcon}
            autoCompleteType={"name"}
            inputValue={fullName}
            inputChangeHandler={setFullName}
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
          />
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={() => console.log("press verify")}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
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
