import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

export function Home() {
  const { isLoaded, signOut } = useAuth();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ paddingTop: 60, paddingVertical: 20 }}>
      <Text>Home</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}
