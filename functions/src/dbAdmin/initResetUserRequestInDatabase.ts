import { Timestamp } from "@firebase/firestore-types";
import { ResetUserPassword } from "../../../typescript-types/db.types";
import firebase, { db } from "../firebase";
import { generateUniqHash } from "../utils/hash";
import { MINUTE } from "../utils/time";

export const initResetUserRequestInDatabase = async (
  email: string,
  expiredTimeDiff: number = 10 * MINUTE
): Promise<string> => {
  const resetPasswordUserHash = await generateUniqHash();

  const createdAt = firebase.firestore.Timestamp.now() as Timestamp;
  const expiredAt = firebase.firestore.Timestamp.fromMillis(createdAt.toMillis() + expiredTimeDiff);

  const resetPasswordData: ResetUserPassword = {
    email,
    resetPasswordUserHash,
    createdAt,
    expiredAt,
  };

  await db.collection("userResetPassword").add(resetPasswordData);
  return resetPasswordUserHash;
};
