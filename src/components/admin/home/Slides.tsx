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
import { colors, icons, sharedStyles } from "@utils";
import { useExpandable } from "@hooks";
import firebase from "@firebase/helpers";
import { ActionButton, LoadingPlaceholder } from "@components/shared";

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

  React.useEffect(() => {
    const fetchData = async () => {
      const imagesInStorage = await firebase.getImagesFromStorage();
      setSlides(imagesInStorage ?? []);
    };

    fetchData();
  }, []);

  const shouldExpand = useExpandable(expanded);

  const loadingPlaceholder = React.useMemo(
    () => (
      <LoadingPlaceholder
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        showActivityIndicator={true}
      />
    ),
    [Dimensions.get("screen").width]
  );

  return (
    <Animated.View style={[sharedStyles.elevatedView, styles.container]}>
      <TouchableOpacity
        style={styles.expandlableHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Slides Images</Text>
        {expanded
          ? icons.CollapseIcon({ size: 30, color: colors.primary })
          : icons.ExpandIcon({ size: 30, color: colors.primary })}
      </TouchableOpacity>

      <View
        style={[
          styles.slidesContainer,
          { height: shouldExpand ? "auto" : 0, overflow: "hidden" },
        ]}
      >
        <FlatList
          data={slides}
          bounces={false}
          ListEmptyComponent={loadingPlaceholder}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-between" }}
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
                <TouchableOpacity>
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
          label="Add Slide"
          onPress={() => console.log("Add Slide")}
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
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: 15,
  },
  expandlableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slidesContainer: {
    marginTop: 20,
    gap: 20,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    gap: 5,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
});
