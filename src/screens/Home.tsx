import { ScrollView } from "react-native";
import React from "react";
import { Header } from "@components";
import { sharedStyles } from "@utils";
import firebase from "@firebase/helpers";
import { useAuthContext } from "@contexts";

export function Home() {
  const { authData } = useAuthContext();

  React.useEffect(() => {
    const getUserData = async () => {
      const userDataFromDB = await firebase.getUserDataFromDB(authData.uid);
      console.log(userDataFromDB);
      // updateUserData({ name: userDataFromDB.name, role: userDataFromDB.role });
    };
    getUserData();
  }, []);

  return (
    <ScrollView style={sharedStyles.wrapper}>
      <Header />
    </ScrollView>
  );
}
