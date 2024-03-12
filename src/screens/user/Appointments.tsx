import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import React from "react";
import { colors, sharedStyles, strings } from "@utils";
import { DatePicker, TimePicker, Services } from "@components/user";
import { ActionButton, ScreenHeader } from "@components/shared";
import CurvedSVG from "@assets/svgs/curvedView.svg";
import { useCalendarUser } from "@hooks";

export type serviceObject = {
  name: string;
  price: number;
};

export function Appointments() {
  const [selectedService, setSelectedService] = React.useState(
    {} as serviceObject
  );
  const calendar = useCalendarUser();

  const scrollableData = [
    {
      key: "curevedSVG",
      component: (
        <View style={styles.headerContainerStyling}>
          <CurvedSVG style={{ color: colors.primary }} />
        </View>
      ),
    },
    {
      key: "screenHeader",
      component: (
        <ScreenHeader
          title={strings.appointments.mainHeading}
          color={colors.white}
          goBack={false}
        />
      ),
    },
    { key: "datePicker", component: <DatePicker calendar={calendar} /> },
    { key: "timePicker", component: <TimePicker calendar={calendar} /> },
    {
      key: "services",
      component: (
        <Services
          selectedService={selectedService}
          selectHandler={setSelectedService}
        />
      ),
    },
  ];

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        data={scrollableData}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />

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
