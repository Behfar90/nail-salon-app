import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@utils";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import LoginSVG from "@assets/svgs/login.svg";
import { ActionButton, InputField, SocialAuthButtons } from "@components";
import { useSignIn } from "@clerk/clerk-expo";

export function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();
  const navigation = useNavigation();

  const emailIcon = (
    <MaterialIcons name="alternate-email" size={20} color={colors.darkGray} />
  );
  const passwordIcon = (
    <Ionicons name="lock-closed-outline" size={20} color={colors.darkGray} />
  );

  const signInWithEmailHandler = async () => {
    setIsLoading(true);
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error: any) {
      Alert.alert(error.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <LoginSVG
          width={200}
          height={200}
          style={{ transform: [{ rotate: "-15deg" }] }}
        />
      </View>
      <Text style={styles.loginText}>Login</Text>
      <InputField
        label={"Email Address"}
        keyboardType={"email-address"}
        autoCompleteType="email"
        icon={emailIcon}
        inputValue={email}
        inputChangeHandler={(text: string) => setEmail(text)}
      />
      <InputField
        label={"Password"}
        icon={passwordIcon}
        inputType="password"
        inputValue={password}
        autoCompleteType="password"
        inputChangeHandler={(text: string) => setPassword(text)}
        fieldButtonLabel="Forgot?"
        fieldButtonClickHandler={() => setIsLoading(!isLoading)}
      />
      <ActionButton
        label={"Login"}
        isLoading={isLoading}
        onPress={signInWithEmailHandler}
        touchableStyle={styles.loginBtn}
        textStyle={styles.loginBtnText}
      />
      <Text style={styles.otherAuthSeparator}>Or, login with ...</Text>
      <SocialAuthButtons />
      <View style={styles.registerContainer}>
        <Text>New to the app?</Text>
        <ActionButton
          label={"Register"}
          onPress={() => navigation.navigate("Register")}
          textStyle={styles.primaryText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    alignItems: "center",
  },
  loginText: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
    color: colors.darkGray,
  },
  loginBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginBtnText: {
    color: colors.white,
    fontWeight: "700",
  },
  otherAuthSeparator: {
    textAlign: "center",
    color: colors.darkGray,
    marginVertical: 30,
  },
  primaryText: {
    color: colors.primary,
    fontWeight: "700",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    gap: 5,
  },
});
