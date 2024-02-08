import { View, Text, Button } from "react-native";
import React from "react";

export function Home() {
  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ paddingTop: 60, paddingVertical: 20 }}>
      <Text>Home</Text>
      <Button title="Sign Out" onPress={() => console.log("sth")} />
    </View>
  );
}
