import { DepartmentInfo } from "../../../typescript-types/db.types";
import { db } from "../firebase";
// import { Chance } from "chance";

interface insertDepartmentIntoCompanyProps {
  domain: string;
  departmentInfo: DepartmentInfo;
}

export const insertDepartmentIntoCompany = async ({
  domain,
  departmentInfo,
}: insertDepartmentIntoCompanyProps): Promise<void> => {
  // const chance = new Chance();
  // const uid = chance.hash({ length: 21 });

  const companyCollection = db.collection("companies").doc(domain);
  await companyCollection.collection("departments").doc().set(departmentInfo);
};
