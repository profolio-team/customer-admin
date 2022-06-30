import { DepartmentInfo } from "../../../typescript-types/db.types";
import { db } from "../firebase";

interface insertDepartmentIntoCompanyProps {
  domain: string;
  departmentInfo: DepartmentInfo;
}

export const insertDepartmentIntoCompany = async ({
  domain,
  departmentInfo,
}: insertDepartmentIntoCompanyProps): Promise<void> => {
  const companyCollection = db.collection("companies").doc(domain);

  await companyCollection.collection("departments").doc().set(departmentInfo);
};
