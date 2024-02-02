import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import GoogleSVG from "@assets/svgs/google.svg";
import FacebookSVG from "@assets/svgs/facebook.svg";
import { colors } from "@utils";
import { useWarmUpBrowser, useSocialOAuth } from "@hooks";

export function SocialAuthButtons() {
  useWarmUpBrowser();

  const handleGoogleSignIn = useSocialOAuth({ oauthStrategy: "oauth_google" });
  const handleFacebookSignIn = useSocialOAuth({
    oauthStrategy: "oauth_facebook",
  });

  return (
    <View style={styles.iconsContainer}>
      <TouchableOpacity style={styles.authIcon} onPress={handleGoogleSignIn}>
        <GoogleSVG width={30} height={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.authIcon} onPress={handleFacebookSignIn}>
        <FacebookSVG width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  authIcon: {
    borderColor: colors.lightGray,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
