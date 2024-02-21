import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { SubHeading } from "./SubHeading";
import { colors } from "@utils";
import art from "@assets/pngs/nail-art.png";
import manicure from "@assets/pngs/manicure.png";
import pedicure from "@assets/pngs/pedicure.png";
import extension from "@assets/pngs/nail-extension.png";
import repair from "@assets/pngs/nail-repair.png";
import polish from "@assets/pngs/nail-polish.png";

const hatrdcodedCategories = [
  "Manicure",
  "Pedicure",
  "Art",
  "Extension",
  "Repair",
  "Polish",
];

export function Categories() {
  const categoryicon = (category: string): string | null => {
    switch (category) {
      case "Manicure":
        return manicure;
      case "Pedicure":
        return pedicure;
      case "Art":
        return art;
      case "Extension":
        return extension;
      case "Repair":
        return repair;
      case "Polish":
        return polish;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SubHeading title="Services" />
      <FlatList
        data={hatrdcodedCategories}
        style={{ marginTop: 10 }}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log("Category Pressed: ", item)}
            style={styles.categoryContainer}
          >
            <View
              style={{
                padding: 5,
                marginBottom: 5,
              }}
            >
              <Image
                source={categoryicon(item) || undefined}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </View>
            <Text style={{ fontSize: 10 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  categoryContainer: {
    width: Dimensions.get("screen").width * 0.17,
    backgroundColor: colors.secondary,
    marginVertical: 15,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
