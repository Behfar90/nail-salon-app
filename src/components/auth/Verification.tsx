import { InputField, ActionButton } from "@components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { colors } from "@utils";

export function Verification({
  isSignUpLoaded,
  signUp,
  setActive,
}: {
  isSignUpLoaded: boolean;
  signUp: any;
  setActive: any;
}) {
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const codeIcon = (
    <Octicons name="unverified" size={20} color={colors.darkGray} />
  );

  const verifyHandler = async () => {
    setIsLoading(true);

    if (!isSignUpLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <InputField
        label={"Verification code..."}
        icon={codeIcon}
        inputValue={code}
        inputChangeHandler={(code: string) => setCode(code)}
      />

      <ActionButton
        label={"Verify Email"}
        onPress={verifyHandler}
        touchableStyle={styles.verificationBtn}
        textStyle={styles.verificationBtnText}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  verificationBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  verificationBtnText: {
    color: colors.white,
    fontWeight: "700",
  },
});
