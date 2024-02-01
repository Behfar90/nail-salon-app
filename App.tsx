import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthStack } from "@navigations";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@env";

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Text>Signed in</Text>
      </SignedIn>
      <SignedOut>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SignedOut>
    </ClerkProvider>
  );
}
