import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
} from "react-native";
import React from "react";
import { ActionButton, Expandable, InputField } from "@components/shared";
import { colors, icons, sharedStyles, strings } from "@utils";
import { usePushNotifications } from "@hooks";
import { Input } from "@rneui/themed";

export function Notification() {
  const [notificationTitle, setNotificationTitle] = React.useState<string>("");
  const [notificationBody, setNotificationBody] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cautiousLevel, setCautiousLevel] = React.useState<number>(1);

  const { expoPushToken } = usePushNotifications();

  const sendNotificationHandler = async () => {
    if (cautiousLevel != 0) {
      setCautiousLevel(cautiousLevel - 1);
      return;
    }
    setIsLoading(true);
    try {
      await sendPushNotification();
    } catch (error) {
      console.error("Error sending notification: ", error);
    }
    setIsLoading(false);
  };

  const resetHandler = () => {
    setCautiousLevel(1);
    setNotificationTitle("");
    setNotificationBody("");
  };

  async function sendPushNotification() {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: notificationTitle,
      body: notificationBody,
      data: { testData: "test data" },
      priority: "high",
      ttl: 0,
      channelId: "default",
      vibrate: true,
      badge: 1,
      _displayInForeground: true,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then((response) => {
      console.log("Notification sent", JSON.stringify(response, null, 2));
      resetHandler();
      Keyboard.dismiss();
    });
  }

  return (
    <Expandable title={strings.notification.mainHeading}>
      <View>
        <View style={styles.inputContainer}>
          <InputField
            label={strings.notification.notificationTitle}
            inputValue={notificationTitle}
            inputChangeHandler={setNotificationTitle}
            inputType="text"
            autoFocus={false}
            icon={icons.TitleIcon({ size: 20, color: colors.gray })}
            autoCompleteType="off"
            fieldButtonLabel={strings.notification.reset}
            fieldButtonClickHandler={resetHandler}
            maxHeight={30}
          />

          <InputField
            label={strings.notification.notificationBody}
            inputValue={notificationBody}
            inputChangeHandler={setNotificationBody}
            inputType="text"
            autoFocus={false}
            icon={icons.MailIcon({ size: 20, color: colors.gray })}
            autoCompleteType="off"
            maxHeight={30}
            marginTop={20}
          />
        </View>
        <ActionButton
          label={
            cautiousLevel == 1
              ? strings.notification.buttonTextNormal
              : strings.notification.buttonTextCertain
          }
          onPress={sendNotificationHandler}
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
    height: 80,
  },
  textAreaContainer: {
    width: Dimensions.get("screen").width * 0.8,
    // height: 60,
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 3,
  },
});
