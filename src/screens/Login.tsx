import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@utils";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import LoginSVG from "@assets/svgs/login.svg";
import GoogleSVG from "@assets/svgs/google.svg";
import FacebookSVG from "@assets/svgs/facebook.svg";
import { ActionButton, InputField } from "@components";

export function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation = useNavigation();
  const emailIcon = (
    <MaterialIcons name="alternate-email" size={20} color={colors.darkGray} />
  );
  const passwordIcon = (
    <Ionicons name="lock-closed-outline" size={20} color={colors.darkGray} />
  );

  const signIn = async () => {
    setIsLoading(true);
    try {
      Alert.alert("Success", "Login successful");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
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
        icon={emailIcon}
        inputValue={email}
        inputChangeHandler={(text: string) => setEmail(text)}
      />
      <InputField
        label={"Password"}
        icon={passwordIcon}
        inputType="password"
        inputValue={password}
        inputChangeHandler={(text: string) => setPassword(text)}
        fieldButtonLabel="Forgot?"
        fieldButtonClickHandler={() => setIsLoading(!isLoading)}
      />
      <ActionButton
        label={"Login"}
        isLoading={isLoading}
        onPress={signIn}
        touchableStyle={styles.loginBtn}
        textStyle={styles.loginBtnText}
      />
      <Text style={styles.otherAuthSeparator}>Or, login with ...</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={styles.authIcon}
          onPress={() => console.log("Google svg")}
        >
          <GoogleSVG width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.authIcon}
          onPress={() => console.log("FB svg")}
        >
          <FacebookSVG width={24} height={24} />
        </TouchableOpacity>
      </View>
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
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  authIcon: {
    borderColor: colors.lightGray,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
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
