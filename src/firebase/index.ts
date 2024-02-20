import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from "@firebase/config";
import {
  PhoneAuthProvider,
  signInWithCredential,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";

// --------------------------
// Firebase Auth Functions
// --------------------------

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
  name: string,
  phoneNumber: string,
  verificationId: string,
  verificationCode: string
) => {
  try {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    const { user } = await signInWithCredential(FIREBASE_AUTH, credential);

    // Update the user's display name on firebase/auth
    await updateProfile(user, {
      displayName: name,
    });

    // Add the user document to the firestore
    await addUserToCloud(user.uid, name, phoneNumber);
  } catch (error) {
    console.error("Error confirming verification code:", error);
  }
};

const getCurrentUserDisplayName = () => {
  return FIREBASE_AUTH.currentUser?.displayName;
};

const signUserOut = async () => {
  try {
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// --------------------------
// Firebase Cloud Functions
// --------------------------

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
      await setDoc(userRef, {
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

const getUserFromCloud = async (uid: string): Promise<any> => {
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

// --------------------------
// Firebase Storage Functions
// --------------------------

const getImagesFromStorage = async () => {
  const gsReference = ref(FIREBASE_STORAGE, "gs://nail-salon-app.appspot.com");
  try {
    const allItems = await listAll(gsReference);
    const url = await Promise.all(
      allItems.items.map(async (item) => {
        return {
          fullPath: item.fullPath,
          imageUrl: await getDownloadURL(item),
        };
      })
    );
    return url;
  } catch (error) {
    console.error("Error getting images from storage:", error);
  }
};

export default {
  sendVerification,
  getCurrentUserDisplayName,
  confirmCode,
  addUserToCloud,
  signUserOut,
  getUserFromCloud,
  getImagesFromStorage,
};
