import { CompanyVerification } from "../../../typescript-types/db.types";
import { db } from "../firebase";

export const getCompanyVerificationData = async (
  domain: string
): Promise<CompanyVerification | null> => {
  const getVerificationDBResult = await db.collection("companyVerification").doc(domain).get();
  const verifyData = getVerificationDBResult.data() as CompanyVerification;
  return verifyData;
};
