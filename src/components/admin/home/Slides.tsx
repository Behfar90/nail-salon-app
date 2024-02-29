import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { colors, icons, sharedStyles, strings } from "@utils";
import { useExpandable } from "@hooks";
import firebase from "@firebase/helpers";
import { ActionButton } from "@components/shared";
import * as ImagePicker from "expo-image-picker";
import { set } from "date-fns";

interface SlidesProps {
  fullPath: string;
  imageUrl: string;
}

const IMAGE_WIDTH = 50;
const IMAGE_HEIGHT = 50;

export function Slides() {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [slides, setSlides] = React.useState<SlidesProps[]>([]);
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const shouldExpand = useExpandable(expanded);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const imagesInStorage = await firebase.getImagesFromStorage();
    setSlides(imagesInStorage ?? []);
  };

  const noSlides = React.useMemo(
    () => (
      <View>
        <Text>{strings.slidesAdmin.noSlidesText}</Text>
      </View>
    ),
    [Dimensions.get("screen").width]
  );

  const hasMediaLibraryPermissionGranted = async () => {
    let granted = false;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.canAskAgain || permission.status === "denied") {
      granted = false;
    }

    if (permission.granted) {
      granted = true;
    }

    return granted;
  };

  const addSlideHandler = async () => {
    const storagePermissionGranted = await hasMediaLibraryPermissionGranted();
    if (!storagePermissionGranted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      try {
        setIsLoading(true);
        const uploadSuccessful = await firebase.addImageToStorage(
          result.assets[0].uri
        );
        if (uploadSuccessful) {
          fetchData();
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error adding image to storage:", error);
      }
    }
  };

  const removeSlideHandler = async (fullPath: string) => {
    try {
      setIsLoading(true);
      await firebase.removeImageFromStorage(fullPath);
      fetchData();
      setIsLoading(false);
    } catch (error) {
      console.error("Error removing image from storage:", error);
    }
  };

  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity
        style={styles.expandlableHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {strings.slidesAdmin.mainHeading} ({slides.length})
        </Text>
        {expanded
          ? icons.CollapseIcon({ size: 30, color: colors.primary })
          : icons.ExpandIcon({ size: 30, color: colors.primary })}
      </TouchableOpacity>

      <View
        style={[
          styles.slidesContainer,
          {
            height: shouldExpand ? "auto" : 0,
            marginTop: shouldExpand ? 20 : 0,
          },
        ]}
      >
        <FlatList
          data={slides}
          bounces={false}
          ListEmptyComponent={noSlides}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item?.imageUrl ?? "" }}
                style={styles.image}
                PlaceholderContent={
                  <ActivityIndicator color={colors.darkGray} />
                }
                onLoad={() => setImageLoaded(true)}
              />
              {imageLoaded && (
                <TouchableOpacity
                  onPress={() => removeSlideHandler(item.fullPath)}
                >
                  {icons.CloseCircleIcon({
                    size: 22,
                    color: colors.red,
                  })}
                </TouchableOpacity>
              )}
            </View>
          )}
        />
        <ActionButton
          label={strings.slidesAdmin.addSlide}
          onPress={addSlideHandler}
          isLoading={isLoading}
          touchableStyle={sharedStyles.actionButtonTouchable}
          textStyle={sharedStyles.actionButtonText}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  expandlableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slidesContainer: {
    overflow: "hidden",
    gap: 20,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
});
