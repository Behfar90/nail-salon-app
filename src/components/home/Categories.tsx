import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";

export function Categories() {
  const [categories, setCategories] = React.useState([]);

  return (
    <SafeAreaView style={{ marginTop: 10 }}>
      {/* <SubHeading title="Doctor Specialty" /> */}

      {/* <FlatList
        data={categories}
        style={{ marginTop: 10 }}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) =>
          index < 4 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("HospitalPage", { category: item.name })
              }
              style={{ alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: colors.secondary,
                  padding: 15,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={{ uri: item.icon }}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: colors.primary,
                  }}
                />
              </View>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )
        }
      /> */}
    </SafeAreaView>
  );
}
