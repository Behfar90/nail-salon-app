import { colors } from "@utils";
import React from "react";
import {
  View,
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
} from "react-native";

type LoadingPlaceholderProps = {
  width: number;
  height: number;
  showActivityIndicator: boolean;
};

const LoadingPlaceholder = ({
  width,
  height,
  showActivityIndicator,
}: LoadingPlaceholderProps) => {
  const opacity = new Animated.Value(0);

  React.useEffect(() => {
    const fadeIn = Animated.timing(opacity, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true,
    });

    fadeIn.start();
    return () => fadeIn.stop();
  }, [opacity]);

  return (
    <Animated.View style={{ ...styles.container, width, height, opacity }}>
      {showActivityIndicator && <ActivityIndicator color={colors.white} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
  },
  textPlaceholder: {
    fontSize: 16,
    color: "#757575",
  },
});

export default LoadingPlaceholder;
