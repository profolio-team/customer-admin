import { CompanyVerification } from "../../../typescript-types/db.types";
import { generateUniqHash } from "../utils/hash";
import { db } from "../firebase";

export const registerCompanyInDatabase = async (domain: string): Promise<string> => {
  const confirmCompanyHash = await generateUniqHash();
  const verificationData: CompanyVerification = {
    confirmCompanyHash: confirmCompanyHash,
    isVerified: false,
  };
  await db.collection("companyVerification").doc(domain).set(verificationData);
  return confirmCompanyHash;
};
