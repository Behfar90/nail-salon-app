import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { colors, sharedStyles, strings } from "@utils";
import { serviceObject } from "@screens";

const availableServices = [
  {
    name: "Manicure",
    price: 200,
  },
  {
    name: "Pedicure",
    price: 150,
  },
  {
    name: "Art",
    price: 300,
  },
  {
    name: "Extension",
    price: 250,
  },
  {
    name: "Repair",
    price: 300,
  },
  {
    name: "Polish",
    price: 350,
  },
];

export function Services({
  selectedService,
  selectHandler,
}: {
  selectedService: serviceObject;
  selectHandler: Dispatch<SetStateAction<serviceObject>>;
}) {
  return (
    <View style={[sharedStyles.partialWrapper, styles.container]}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        {strings.services.mainHeading}
      </Text>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {availableServices.map((service, index) => {
          const isSelectedService = selectedService.name === service.name;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.serviceContainer,
                isSelectedService ? styles.selectedServiceContainer : {},
              ]}
              onPress={() => selectHandler(service)}
            >
              <Text>{service.name}</Text>
              <Text>{service.price} kr</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    height: 150,
  },
  scrollContainer: {
    marginTop: 20,
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  selectedServiceContainer: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
});
