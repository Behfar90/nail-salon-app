import { Alert, Animated, Dimensions, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { ActionButton, InputField } from "@components";
import { Stepper } from "./Stepper";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { FIREBASE_APP } from "@firebase/config";
import { colors, icons, strings } from "@utils";
import { sendVerification, confirmCode } from "@firebase/helpers";

export function SignupSteps({
  numberOfSteps,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  verificationCode,
  setVerificationCode,
  verificationId,
  setVerificationId,
}: {
  numberOfSteps: number;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  verificationCode: string;
  setVerificationCode: Dispatch<SetStateAction<string>>;
  verificationId: string | undefined;
  setVerificationId: Dispatch<SetStateAction<string | undefined>>;
}) {
  const [step, setStep] = React.useState<number>(1);

  const recaptchaVerifier = React.useRef(null);

  /**
   * Animated borderWidth for the stepper container
   * Animated opacity for the input field
   * Animated duration and value for the last step
   */
  const animatedBorderWidth = React.useRef(new Animated.Value(0)).current;
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;
  const animatedDuration = step === numberOfSteps ? 500 : 1000;
  const animatedToValue = step === numberOfSteps ? 0 : 1;

  /**
   * Effect to handle the stepper container border animation
   */
  React.useEffect(() => {
    if (step === 1) {
      return;
    }
    Animated.parallel([
      Animated.timing(animatedBorderWidth, {
        toValue: animatedToValue,
        duration: animatedDuration,
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: animatedToValue,
        duration: animatedDuration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [step]);

  /**
   * Interpolated border width values
   */
  const borderRightWidth = animatedBorderWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0", "2"],
  });

  const borderLeftWidth = animatedBorderWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0", "2"],
  });

  const borderTopWidth = animatedBorderWidth.interpolate({
    inputRange: [0, 2],
    outputRange: ["0", "2"],
  });

  /**
   *  Handler for the stepper button
   * @returns void
   */
  const stepperButtonHandler: () => Promise<void> = async () => {
    if (step > numberOfSteps) {
      return;
    }
    if (step === 2 && name === "") {
      Alert.alert(strings.alert.name_required);
      return;
    }
    if (step === 3) {
      if (phoneNumber === "") {
        Alert.alert(strings.alert.phone_required);
        return;
      }
      if (RegExp(/^\+\d+/).exec(phoneNumber) === null) {
        Alert.alert(strings.alert.phone_country_code);
        return;
      }
      const verId = await sendVerification(phoneNumber, recaptchaVerifier);
      setVerificationId(verId);
    }
    if (step === 4) {
      if (verificationCode === "") {
        Alert.alert(strings.alert.verification_code_required);
        return;
      }
      const user = await confirmCode(
        verificationId as string,
        verificationCode
      );
      console.log("Now the result --->", JSON.stringify(user, null, 2));
    }
    setStep((prev) => prev + 1);
  };

  /**
   *  Function to return the props for the InputField component based on the step
   * @returns Object with the props for the InputField component
   */
  const inputStepperPropsGetter = () => {
    switch (step) {
      case 2:
        return {
          label: strings.start.stepper_input_step_2,
          icon: icons.PersonIcon({ size: 20, color: colors.lightGray }),
          autoFocus: true,
          inputValue: name,
          inputChangeHandler: setName,
          autoCompleteType: "given-name",
        };
      case 3:
        return {
          label: strings.start.stepper_input_step_3,
          icon: icons.PhoneIcon({ size: 20, color: colors.lightGray }),
          autoFocus: true,
          inputValue: phoneNumber,
          inputChangeHandler: setPhoneNumber,
          autoCompleteType: "tel",
          keyboardType: "phone-pad",
        };
      case 4:
        return {
          label: strings.start.stepper_input_step_4,
          icon: icons.VerifyIcon({ size: 20, color: colors.lightGray }),
          autoFocus: true,
          inputValue: verificationCode,
          inputChangeHandler: setVerificationCode,
          autoCompleteType: "one-time-code",
          keyboardType: "numeric",
        };
      default:
        break;
    }
  };

  return (
    <Animated.View
      style={{
        ...styles.stepperContainer,
        borderTopWidth,
        borderLeftWidth,
        borderRightWidth,
      }}
    >
      <Animated.View
        style={{
          ...styles.inputContainer,
          opacity: animatedOpacity,
        }}
      >
        <InputField {...inputStepperPropsGetter()} />
      </Animated.View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FIREBASE_APP.options}
        attemptInvisibleVerification={true}
      />
      <ActionButton
        label={
          strings.start[
            `stepper_btn_step_${step}` as keyof typeof strings.start
          ]
        }
        onPress={stepperButtonHandler}
        textStyle={styles.btnText}
        touchableStyle={styles.button}
      />
      <Stepper numberOfSteps={numberOfSteps} currentStep={step} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stepperContainer: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    borderColor: colors.primary,
    borderBottomWidth: 0,
    borderRadius: 20,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 30,
    width: Dimensions.get("screen").width * 0.8,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: colors.white,
    fontWeight: "700",
  },
});
