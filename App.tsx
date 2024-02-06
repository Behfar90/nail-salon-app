import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack, MainNavigator } from "@navigations";
import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import { tokenCache } from "@utils";
import { UserProvider } from "@contexts";

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <UserProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </UserProvider>
      </SignedIn>
      <SignedOut>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SignedOut>
    </ClerkProvider>
  );
}
