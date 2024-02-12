import { FIREBASE_AUTH, FIREBASE_DB } from "@firebase/config";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

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
) => {
  await addDoc(collection(FIREBASE_DB, "users"), {
    id: uid,
    name: displayName,
    phone: phoneNumber,
    isAdmin: false,
  });
};

export default {
  sendVerification,
  confirmCode,
  addUserToCloud,
};
