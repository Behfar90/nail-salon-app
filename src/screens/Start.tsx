import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { colors, strings } from "@utils";
import LoginSVG from "@assets/svgs/login.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignupSteps } from "@components";

export function Start() {
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
        <SignupSteps numberOfSteps={5} />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
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
    // alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  mainHeader: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
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
});
