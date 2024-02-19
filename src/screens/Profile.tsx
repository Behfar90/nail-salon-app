import { useAuthContext, useUserContext } from "@contexts";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import firebase from "@firebase/helpers";

export function Profile() {
  const { authData } = useAuthContext();
  const { userData } = useUserContext();

  if (authData.isAuthenticationLoading || userData.isUserLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <View style={styles.profileInfo}>
        <Text>Name: {userData.name}</Text>
        <Text>Role: {userData.role}</Text>
        <Text>Phone Number: {authData.phoneNumber}</Text>
        <Text>Member since: {authData.createdAt?.toDateString()}</Text>
      </View>
      <View style={styles.signOutButton}>
        <Button title="Sign Out" onPress={() => firebase.signUserOut()} />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileInfo: {
    width: "80%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  signOutButton: {
    width: "80%",
  },
});
