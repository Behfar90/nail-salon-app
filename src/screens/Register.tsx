import { View, ScrollView, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@utils";
// import { useSignUp } from "@clerk/clerk-expo";
import RegistrationSVG from "@assets/svgs/registration.svg";
import {
  ActionButton,
  RegisterForm,
  SocialAuthButtons,
  Verification,
} from "@components";

export function Register() {
  const navigation = useNavigation();
  // const { isLoaded, signUp, setActive } = useSignUp();

  const [pendingVerification, setPendingVerification] = React.useState(false);

  const signUp = () => {
    console.log("signUp");
  };

  const isLoaded = true;

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

        <SocialAuthButtons />

        <Text style={styles.otherAuthSeparator}>Or, register with email</Text>
        {!pendingVerification && (
          <>
            <RegisterForm
              PendinVerificationToggler={setPendingVerification}
              isSignUpLoaded={isLoaded}
              signUp={signUp}
            />
            <View style={styles.registerContainer}>
              <Text>Already registered?</Text>
              <ActionButton
                id={"login"}
                label={"Login"}
                onPress={() => navigation.goBack()}
                textStyle={styles.primaryText}
              />
            </View>
          </>
        )}
        {/* {pendingVerification && (
          <Verification
            isSignUpLoaded={isLoaded}
            signUp={signUp}
            setActive={setActive}
          />
        )} */}
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
