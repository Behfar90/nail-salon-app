import {
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import firebase from "@firebase/helpers";
import React from "react";

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

  if (!slides.length) {
    return (
      <SafeAreaView style={{ marginTop: 10 }}>
        <Text>loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item?.imageUrl ?? "" }} style={styles.image} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  image: {
    width: Dimensions.get("screen").width * 0.8,
    height: 170,
    borderRadius: 10,
    margin: 2,
  },
});
