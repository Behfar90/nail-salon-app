import { ScrollView, View, StyleSheet, Dimensions, Text } from "react-native";
import React from "react";
import { colors, sharedStyles, strings } from "@utils";
import {
  DatePicker,
  ScreenHeader,
  TimePicker,
  Services,
  ActionButton,
} from "@components";
import CurvedSVG from "@assets/svgs/curvedView.svg";
import { useCalendar } from "@hooks";

export type serviceObject = {
  name: string;
  price: number;
};

export function Appointments() {
  const [selectedService, setSelectedService] = React.useState(
    {} as serviceObject
  );
  const calendar = useCalendar();

  return (
    <View style={{ flex: 1 }}>
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
          <Services
            selectedService={selectedService}
            selectHandler={setSelectedService}
          />
        </View>
      </ScrollView>
      <ActionButton
        label={strings.appointment.confirmButton}
        touchableStyle={[
          sharedStyles.actionButtonTouchable,
          styles.confirmButton,
        ]}
        textStyle={sharedStyles.actionButtonText}
        onPress={() => {
          console.log("Appointment confirmed");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainerStyling: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.4,
  },
  confirmButton: {
    marginVertical: 10,
  },
});
