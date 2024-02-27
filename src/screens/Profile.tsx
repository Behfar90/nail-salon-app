import { useAuthContext } from "@contexts";
import React from "react";
import { View, StyleSheet, Dimensions, Text, Linking } from "react-native";
import firebase from "@firebase/helpers";
import ReversedCurvedSVG from "@assets/svgs/reversedCurvedView.svg";
import { colors, icons, sharedStyles, strings } from "@utils";
import {
  ActionButton,
  ScreenHeader,
  UserAppointmentTab,
  UserInfo,
} from "@components";

export function Profile() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { authData } = useAuthContext();

  return (
    <View
      style={
        (sharedStyles.wrapper,
        { justifyContent: "space-between", height: "100%" })
      }
    >
      <View style={styles.headerContainerStyling}>
        <ReversedCurvedSVG style={{ color: colors.primary }} />
      </View>

      <View style={styles.tabContainer}>
        <ScreenHeader
          title={strings.profile.mainHeading}
          color={colors.white}
          goBack={false}
        />
        <UserAppointmentTab
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </View>
      {activeIndex === 0 ? (
        <View style={styles.profileInfo}>
          <UserInfo
            icon={icons.PersonIcon({ size: 24, color: colors.blue })}
            title={strings.profile.displayName}
            value={authData.displayName}
          />
          <UserInfo
            icon={icons.TelIcon({ size: 24, color: colors.tertiary })}
            title={strings.profile.phoneNumber}
            value={authData.phoneNumber}
          />
          <UserInfo
            icon={icons.MemberSinceIcon({ size: 24, color: colors.red })}
            title={strings.profile.membersince}
            value={authData.createdAt?.toDateString()}
          />

          <Text
            onPress={() =>
              Linking.openURL("https://www.flaticon.com/free-icons/nails")
            }
            style={{
              color: "blue",
              fontSize: 12,
              textDecorationLine: "underline",
            }}
          >
            Nails icons created by Freepik - Flaticon
          </Text>
        </View>
      ) : (
        <View style={styles.appointmentHistory}>
          <Text>Appointment History</Text>
        </View>
      )}
      <ActionButton
        label={strings.profile.logout}
        touchableStyle={[
          sharedStyles.actionButtonTouchable,
          { marginBottom: 20 },
        ]}
        textStyle={sharedStyles.actionButtonText}
        onPress={() => firebase.signUserOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainerStyling: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.3,
  },
  tabContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
  },
  profileInfo: {
    display: "flex",
    gap: 30,
    alignItems: "center",
  },
  appointmentHistory: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
