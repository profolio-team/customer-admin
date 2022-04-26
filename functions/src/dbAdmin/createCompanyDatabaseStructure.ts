import { CompanyInfo, CompanyVerification } from "../../../typescript-types/db.types";
import { db } from "../firebase";

export const createCompanyDatabaseStructure = async (
  domain: string,
  verifyData: CompanyVerification
): Promise<void> => {
  const updatedVerificationInfo: CompanyVerification = {
    ...verifyData,
    isVerified: true,
  };
  await db
    .collection("companyVerification")
    .doc(domain)
    .set(updatedVerificationInfo, { merge: true });

  const companyCollection = db.collection("companies").doc(domain);

  companyCollection.set({
    testField:
      'Do not delete this field. It`s required for correct work of "dev button". Function: delete database',
  });

  const companyInfo: CompanyInfo = {
    name: "",
    about: "",
    phone: "",
    logoUrl: "",
    template: "",
    email: "",
  };
  await companyCollection.collection("config").doc("companyInfo").set(companyInfo, { merge: true });
};
