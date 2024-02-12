import { FIREBASE_AUTH } from "@firebase/config";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

export const sendVerification = async (
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

export const confirmCode = async (
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
