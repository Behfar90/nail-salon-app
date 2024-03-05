import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActionButton, Expandable, InputField } from "@components/shared";
import { colors, icons, sharedStyles, strings } from "@utils";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function Notification() {
  // const [notification, setNotification] = React.useState<string>("");
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const [cautiousLevel, setCautiousLevel] = React.useState<number>(1);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    const registerAndSetPushToken = async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    };

    registerAndSetPushToken();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("notification", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    console.log("Device: ", Device.isDevice);
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "53425895-c111-475f-8c36-d8fc036e26a6",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  }

  // const senNotificationHandler = () => {
  //   if (cautiousLevel != 0) {
  //     setCautiousLevel(cautiousLevel - 1);
  //     return;
  //   }
  //   setIsLoading(true);
  //   // send notification process
  //   setIsLoading(false);
  // };

  // const resetHandler = () => {
  //   setCautiousLevel(1);
  //   setNotification("");
  // };

  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Test title",
      body: "Test body",
      data: { testData: "test data" },
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
      console.log("response:", response);
    });
  }

  return (
    // <Expandable title={strings.notification.mainHeading}>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Notification Title:{" "}
          {notification && notification.request.content.title}{" "}
        </Text>
        <Text>
          Notification Body: {notification && notification.request.content.body}
        </Text>
        <Text>
          Notification Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
    // </Expandable>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    width: Dimensions.get("screen").width * 0.8,
    height: 30,
  },
});
