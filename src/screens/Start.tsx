import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import React from "react";
import { colors, strings, icons } from "@utils";
import LoginSVG from "@assets/svgs/login.svg";
import { Stepper, ActionButton, InputField } from "@components";

const NumberOfSteps = 5;

export function Start() {
  const [step, setStep] = React.useState<number>(1);
  const [name, setName] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [verificationCode, setVerificationCode] = React.useState<string>("");

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
  const stepperButtonHandler: () => void = () => {
    if (step > NumberOfSteps) {
      return;
    }
    if (step === 2 && name === "") {
      Alert.alert("Name is required");
      return;
    }
    if (step === 3 && phoneNumber === "") {
      Alert.alert("Phone number is required");
      return;
    }
    if (step === 4 && verificationCode === "") {
      Alert.alert("Verification code is required");
      return;
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

  console.log(
    "name",
    name,
    "phoneNumber",
    phoneNumber,
    "verificationCode",
    verificationCode
  );

  return (
    <View style={styles.container}>
      <LoginSVG
        width={250}
        height={350}
        style={{ transform: [{ rotate: "-15deg" }] }}
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
    </View>
  );
}

/**
 * Styles for Start component
 */
const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "relative",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  mainHeader: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 30,
  },
  subHeader1: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 25,
  },
  subHeader2: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 25,
  },
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
