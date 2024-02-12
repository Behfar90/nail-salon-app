import {
  Text,
  Dimensions,
  Animated,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { colors, strings, icons } from "@utils";
import LoginSVG from "@assets/svgs/login.svg";
import { Stepper, ActionButton, InputField } from "@components";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FIREBASE_APP } from "@firebase/config";
import { sendVerification, confirmCode } from "@firebase/helpers";
import { NumberOfSteps, styles } from "./Start";

export function Start() {
  const [step, setStep] = React.useState<number>(1);
  const [name, setName] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [verificationCode, setVerificationCode] = React.useState<string>("");
  const [verificationId, setVerificationId] = React.useState<
    string | undefined
  >();

  const recaptchaVerifier = React.useRef(null);

  /**
   * Animated borderWidth for the stepper container
   * Animated opacity for the input field
   * Animated duration and value for the last step
   */
  const animatedBorderWidth = React.useRef(new Animated.Value(0)).current;
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;
  const animatedDuration = step === NumberOfSteps ? 500 : 1000;
  const animatedToValue = step === NumberOfSteps ? 0 : 1;

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
    if (step > NumberOfSteps) {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LoginSVG
          width={Dimensions.get("screen").width * 0.66}
          height={Dimensions.get("screen").height * 0.33}
          style={{ transform: [{ rotate: "-15deg" }], alignSelf: "center" }}
        />

        <Text style={styles.mainHeader}>{strings.start.mainHeader}</Text>
        <Text style={styles.subHeader1}>{strings.start.subHeader}</Text>
        <Text style={styles.subHeader2}>{strings.start.subHeader2}</Text>

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
          <Stepper numberOfSteps={NumberOfSteps} currentStep={step} />
        </Animated.View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
