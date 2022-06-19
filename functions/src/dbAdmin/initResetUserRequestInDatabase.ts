import { Timestamp } from "@firebase/firestore-types";
import { ResetUserPassword } from "../../../typescript-types/db.types";
import firebase, { db } from "../firebase";
import { generateUniqHash } from "../utils/hash";
const { FieldValue } = firebase.firestore;

export const initResetUserRequestInDatabase = async (email: string): Promise<string> => {
  const resetPasswordUserHash = await generateUniqHash();
  const createdAt = FieldValue.serverTimestamp() as Timestamp;
  const resetPasswordData: ResetUserPassword = {
    email,
    resetPasswordUserHash,
    createdAt,
  };

  await db.collection("userResetPassword").add(resetPasswordData);
  return resetPasswordUserHash;
};
