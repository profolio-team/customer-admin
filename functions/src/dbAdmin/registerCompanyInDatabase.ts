import { CompanyVerification } from "../../../typescript-types/db.types";
import { generateUniqHash } from "../utils/hash";
import { Timestamp } from "@firebase/firestore-types";
import firebase, { db } from "../firebase";
const { FieldValue } = firebase.firestore;

export const registerCompanyInDatabase = async (domain: string): Promise<string> => {
  const confirmCompanyHash = await generateUniqHash();
  const createdAt = FieldValue.serverTimestamp() as Timestamp;
  const verificationData: CompanyVerification = {
    confirmCompanyHash: confirmCompanyHash,
    isVerified: false,
    createdAt,
  };
  await db.collection("companyVerification").doc(domain).set(verificationData);
  return confirmCompanyHash;
};
