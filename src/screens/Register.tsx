import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@utils";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import RegistrationSVG from "@assets/svgs/registration.svg";
import GoogleSVG from "@assets/svgs/google.svg";
import FacebookSVG from "@assets/svgs/facebook.svg";
import { ActionButton, InputField } from "@components";
import { useWarmUpBrowser, useSocialOAuth } from "@hooks";

export function Register() {
  useWarmUpBrowser();

  const navigation = useNavigation();
  const handleGoogleSignIn = useSocialOAuth({ oauthStrategy: "oauth_google" });
  const handleFacebookSignIn = useSocialOAuth({
    oauthStrategy: "oauth_facebook",
  });

  const fullNameIcon = (
    <Ionicons name="person-outline" size={20} color={colors.darkGray} />
  );

  const emailIcon = (
    <MaterialIcons name="alternate-email" size={20} color={colors.darkGray} />
  );

  const passwordIcon = (
    <Ionicons name="lock-closed-outline" size={20} color={colors.darkGray} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={styles.logo}>
          <RegistrationSVG
            width={150}
            height={150}
            style={{ transform: [{ rotate: "-15deg" }] }}
          />
        </View>
        <Text style={styles.registerText}>Register</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.authIcon}
            onPress={handleGoogleSignIn}
          >
            <GoogleSVG width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authIcon}
            onPress={handleFacebookSignIn}
          >
            <FacebookSVG width={24} height={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.otherAuthSeparator}>Or, register with email</Text>
        <InputField label={"Full Name"} icon={fullNameIcon} />
        <InputField
          label={"Email Address"}
          icon={emailIcon}
          keyboardType={"email-address"}
        />
        <InputField
          label={"Password"}
          icon={passwordIcon}
          inputType="password"
        />
        <InputField
          label={"Confirm Password"}
          icon={passwordIcon}
          inputType="password"
        />

        <ActionButton
          label={"Register"}
          onPress={() => console.log("regiseter")}
          touchableStyle={styles.registerBtn}
          textStyle={styles.registerBtnText}
        />
        <View style={styles.registerContainer}>
          <Text>Already registered?</Text>
          <ActionButton
            label={"Login"}
            onPress={() => navigation.goBack()}
            textStyle={styles.primaryText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  logo: {
    alignItems: "center",
  },
  registerText: {
    fontSize: 28,
    fontWeight: "500",
    marginVertical: 30,
    color: colors.darkGray,
  },
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
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
    gap: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    gap: 5,
  },
});
