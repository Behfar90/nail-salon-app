import {
  SafeAreaView,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import firebase from "@firebase/helpers";
import React from "react";
import { Image } from "@rneui/themed";
import { colors } from "@utils";

interface SlidesProps {
  fullPath: string;
  imageUrl: string;
}

export function Slides() {
  const [slides, setSlides] = React.useState<SlidesProps[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const imagesInStorage = await firebase.downlodImagesFromStorage();
      setSlides(imagesInStorage ?? []);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item?.imageUrl ?? "" }}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator color={colors.white} />}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  image: {
    width: Dimensions.get("screen").width * 0.8,
    height: 170,
    borderRadius: 10,
    marginRight: 5,
  },
});
