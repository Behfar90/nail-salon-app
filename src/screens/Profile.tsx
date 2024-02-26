import { useAuthContext } from "@contexts";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  Dimensions,
} from "react-native";
import firebase from "@firebase/helpers";
import ReversedCurvedSVG from "@assets/svgs/reversedCurvedView.svg";
import { colors, sharedStyles, strings } from "@utils";
import { ActionButton, ScreenHeader } from "@components";

export function Profile() {
  const { authData } = useAuthContext();

  return (
    <View style={sharedStyles.wrapper}>
      <View style={styles.headerContainerStyling}>
        <ReversedCurvedSVG style={{ color: colors.secondary }} />
      </View>
      <View style={styles.profileInfo}>
        <ScreenHeader
          title={strings.profile.mainHeading}
          color={colors.black}
          goBack={false}
        />
        <View>
          <Text>Display name: {authData.displayName}</Text>
          <Text>Tel: {authData.phoneNumber}</Text>
          <Text>Member since: {authData.createdAt?.toDateString()}</Text>

          <Text
            href="https://www.flaticon.com/free-icons/nails"
            title="nails icons"
          >
            Nails icons created by Freepik - Flaticon
          </Text>
        </View>
        <ActionButton
          label={strings.profile.logout}
          touchableStyle={sharedStyles.actionButtonTouchable}
          textStyle={sharedStyles.actionButtonText}
          onPress={() => firebase.signUserOut()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainerStyling: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.3,
  },
  profileInfo: {
    display: "flex",
    height: Dimensions.get("window").height * 0.8,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
