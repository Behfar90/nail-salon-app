import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack, TabNavigation } from "@navigations";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@env";

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
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
