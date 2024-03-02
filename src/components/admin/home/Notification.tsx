import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { ActionButton, Expandable, InputField } from "@components/shared";
import { colors, icons, sharedStyles, strings } from "@utils";

export function Notification() {
  const [notification, setNotification] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cautiousLevel, setCautiousLevel] = React.useState<number>(1);

  const senNotificationHandler = () => {
    if (cautiousLevel != 0) {
      setCautiousLevel(cautiousLevel - 1);
      return;
    }
    setIsLoading(true);
    // send notification process
    setIsLoading(false);
  };

  const resetHandler = () => {
    setCautiousLevel(1);
    setNotification("");
  };

  return (
    <Expandable title={strings.notification.mainHeading}>
      <View>
        <View style={styles.inputContainer}>
          <InputField
            label="Notification"
            inputValue={notification}
            inputChangeHandler={setNotification}
            inputType="text"
            autoFocus={true}
            icon={icons.MailIcon({ size: 20, color: colors.gray })}
            autoCompleteType="off"
            fieldButtonLabel="Reset"
            fieldButtonClickHandler={resetHandler}
          />
        </View>
        <ActionButton
          label={
            cautiousLevel == 1
              ? strings.notification.buttonTextNormal
              : strings.notification.buttonTextCertain
          }
          onPress={senNotificationHandler}
          isLoading={isLoading}
          touchableStyle={sharedStyles.actionButtonTouchable}
          textStyle={sharedStyles.actionButtonText}
        />
      </View>
    </Expandable>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    width: Dimensions.get("screen").width * 0.8,
    height: 30,
  },
});
