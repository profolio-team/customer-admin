import { CompanyInfo } from "../../../typescript-types/db.types";
import { db } from "../firebase";

export const getEmptyCompanyTemplate = (): CompanyInfo => ({
  name: "",
  about: "",
  phone: "",
  logoUrl: "",
  template: "",
  email: "",
});

interface SetCompanyInfoProps {
  domain: string;
  companyInfo: CompanyInfo;
}
export async function setCompanyInfo({ domain, companyInfo }: SetCompanyInfoProps) {
  const companyCollection = await db.collection("companies").doc(domain);
  await companyCollection.collection("config").doc("companyInfo").set(companyInfo);
}
