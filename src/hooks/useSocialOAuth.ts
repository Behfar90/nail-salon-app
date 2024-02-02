import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { Alert } from "react-native";

type OAuthStrategy = "oauth_google" | "oauth_facebook";

export const useSocialOAuth = ({
  oauthStrategy,
}: {
  oauthStrategy: OAuthStrategy;
}) => {
  const { startOAuthFlow } = useOAuth({ strategy: oauthStrategy });

  return React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      Alert.alert(error.errors[0].message);
    }
  }, []);
};
