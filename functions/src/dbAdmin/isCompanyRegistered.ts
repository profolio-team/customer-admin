import { db } from "../firebase";
import { CompanyVerification } from "../../../typescript-types/db.types";

export const isCompanyRegistered = async (domain: string): Promise<boolean> => {
  const verificationDocument = await db.collection("companyVerification").doc(domain).get();
  const verificationDocumentData = verificationDocument.data() as CompanyVerification;
  return !!verificationDocumentData;
};
