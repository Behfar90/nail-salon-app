import React from "react";
import { FIREBASE_AUTH } from "@firebase/config";
import { User, onAuthStateChanged } from "firebase/auth";

export function useAuthState() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return user;
}
