import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack, TabNavigation } from "@navigations";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import { tokenCache } from "@utils";

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SignedOut>
    </ClerkProvider>
  );
}
