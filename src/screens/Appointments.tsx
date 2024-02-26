import { ScrollView, View, StyleSheet, Dimensions, Text } from "react-native";
import React from "react";
import { colors, sharedStyles, strings } from "@utils";
import { DatePicker, ScreenHeader, TimePicker } from "@components";
import CurvedSVG from "@assets/svgs/curvedView.svg";
import { useCalendar } from "@hooks";

export function Appointments() {
  const calendar = useCalendar();

  return (
    <ScrollView style={{ position: "relative" }}>
      <View style={styles.headerContainerStyling}>
        <CurvedSVG style={{ color: colors.primary }} />
      </View>
      <View style={sharedStyles.wrapper}>
        <ScreenHeader
          title={strings.appointments.mainHeading}
          color={colors.white}
          goBack={false}
        />
        <DatePicker calendar={calendar} />
        <TimePicker calendar={calendar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainerStyling: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.4,
  },
});
