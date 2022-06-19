import { CompanyVerification } from "../../../typescript-types/db.types";
import { generateUniqHash } from "../utils/hash";

import firebase, { db } from "../firebase";
import { Timestamp } from "@firebase/firestore-types";
import { MINUTE } from "../utils/time";

export const registerCompanyInDatabase = async (
  domain: string,
  expiredTimeDiff: number = 10 * MINUTE,
  isVerified: boolean = false
): Promise<string> => {
  const confirmCompanyHash = await generateUniqHash();

  const createdAt = firebase.firestore.Timestamp.now() as Timestamp;
  const expiredAt = firebase.firestore.Timestamp.fromMillis(createdAt.toMillis() + expiredTimeDiff);

  const verificationData: CompanyVerification = {
    confirmCompanyHash: confirmCompanyHash,
    isVerified: isVerified,
    createdAt,
    expiredAt,
  };
  await db.collection("companyVerification").doc(domain).set(verificationData);
  return confirmCompanyHash;
};
