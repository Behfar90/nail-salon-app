import { ScrollView } from "react-native";
import React from "react";
import { Header } from "@components";
import { useUserContext } from "@contexts";
import { sharedStyles } from "@utils";
import firebase from "@firebase/helpers";

export function Home() {
  const { userData, updateUserData } = useUserContext();

  React.useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const data = await firebase.getUserDataFromDB(userData?.id);

        if (isMounted) {
          if (data) {
            updateUserData({ name: data?.name, role: data?.role });
          } else {
            // Retry after a delay
            setTimeout(fetchUserData, 1000);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, [userData, updateUserData]);

  return (
    <ScrollView style={sharedStyles.wrapper}>
      <Header />
    </ScrollView>
  );
}
