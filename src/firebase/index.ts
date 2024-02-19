import { FIREBASE_AUTH, FIREBASE_DB } from "@firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const sendVerification = async (
  phoneNumber: string,
  verifierRef: React.RefObject<any>
): Promise<string | undefined> => {
  const phoneProvider = new PhoneAuthProvider(FIREBASE_AUTH);
  try {
    return await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      verifierRef.current
    );
  } catch (error) {
    console.error("Error sending verification code:", error);
  }
};

const confirmCode = async (
  verificationId: string,
  verificationCode: string
): Promise<any> => {
  try {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    return await signInWithCredential(FIREBASE_AUTH, credential);
  } catch (error) {
    console.error("Error confirming verification code:", error);
  }
};

const addUserToCloud = async (
  uid: string,
  displayName: string,
  phoneNumber: string
): Promise<void> => {
  const userRef = doc(FIREBASE_DB, "users", uid);
  try {
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      // User does not exist, add to the database
      const res = await setDoc(userRef, {
        id: uid,
        name: displayName,
        phone: phoneNumber,
        isAdmin: false,
      });
    }
  } catch {
    console.error("Error adding user to the db");
  }
};

const getUserDataFromDB = async (uid: string): Promise<any> => {
  const userRef = doc(FIREBASE_DB, "users", uid);
  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return Promise.resolve(null);
    }
  } catch {
    console.error("Error getting user data from the db");
  }
};

export default {
  sendVerification,
  confirmCode,
  addUserToCloud,
  getUserDataFromDB,
};
