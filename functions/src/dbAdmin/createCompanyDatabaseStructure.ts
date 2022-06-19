import { CompanyInfo } from "../../../typescript-types/db.types";
import { db } from "../firebase";

export const createCompanyDatabaseStructure = async (domain: string): Promise<void> => {
  await db.collection("companyVerification").doc(domain).set(
    {
      isVerified: true,
    },
    { merge: true }
  );

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
