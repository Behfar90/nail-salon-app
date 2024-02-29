import { Alert, Animated, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { ActionButton, InputField } from "@components/shared";
import { Stepper } from "./Stepper";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { FIREBASE_APP } from "@firebase/config";
import { colors, icons, sharedStyles, strings } from "@utils";
import firebase from "@firebase/helpers";
import { useAuthContext } from "@contexts";

// make an interface for props
interface SignupStepsProps {
  numberOfSteps: number;
}

export function SignupSteps({ numberOfSteps }: SignupStepsProps) {
  const [step, setStep] = React.useState<number>(1);
  const [name, setName] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [verificationCode, setVerificationCode] = React.useState<string>("");
  const [verificationId, setVerificationId] = React.useState<
    string | undefined
  >();

  const recaptchaVerifier = React.useRef(null);

  const { authData, updateAuthData } = useAuthContext();

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

  const validateName = () => {
    if (name === "") {
      Alert.alert(strings.alert.name_required);
      return false;
    }
    return true;
  };

  const validatePhoneNumber = () => {
    if (phoneNumber === "") {
      Alert.alert(strings.alert.phone_required);
      return false;
    }
    if (RegExp(/^\+\d+/).exec(phoneNumber) === null) {
      Alert.alert(strings.alert.phone_country_code);
      return false;
    }
    return true;
  };

  const validateVerificationCode = () => {
    if (verificationCode === "") {
      Alert.alert(strings.alert.verification_code_required);
      return false;
    }
    return true;
  };

  const sendVerificationCode = async () => {
    updateAuthData({
      isAuthenticationLoading: true,
    });
    const verId = await firebase.sendVerification(
      phoneNumber,
      recaptchaVerifier
    );
    setVerificationId(verId);
    updateAuthData({
      isAuthenticationLoading: false,
    });
  };

  const handleConfirmation = async () => {
    updateAuthData({
      isAuthenticationLoading: true,
    });
    try {
      await firebase.confirmCode(
        name,
        phoneNumber,
        verificationId as string,
        verificationCode
      );
    } catch (error) {
      console.error("Error confirming verification code:", error);
    } finally {
      updateAuthData({
        isAuthenticationLoading: false,
      });
    }
  };

  /**
   *  Function to handle the stepper button press
   * @returns Promise<void>
   */
  const stepperButtonHandler: () => Promise<void> = async () => {
    if (step > numberOfSteps) {
      return;
    }

    switch (step) {
      case 2:
        if (!validateName()) {
          return;
        }
        break;
      case 3:
        if (!validatePhoneNumber()) {
          return;
        }
        await sendVerificationCode();
        break;
      case 4:
        if (!validateVerificationCode()) {
          return;
        }
        await handleConfirmation();
        break;
      default:
        break;
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
        isLoading={authData?.isAuthenticationLoading}
        onPress={stepperButtonHandler}
        touchableStyle={sharedStyles.actionButtonTouchable}
        textStyle={sharedStyles.actionButtonText}
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
});
