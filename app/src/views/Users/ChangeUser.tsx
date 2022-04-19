import { UserForm } from "./UserForm";
import { CorporateUserInfo } from "../../../../typescript-types/db.types";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { useParams } from "react-router-dom";
import { DepartmentFields } from "./UsersPage";
import { FullUserInfo } from "./AllUsers";

export function ChangeUser({
  departments,
  user,
}: {
  departments: DepartmentFields[];
  user: FullUserInfo;
}) {
  const { unit } = useParams();
  // const [defaultUserInfo] = useDocumentData(doc(db.adminUserInfos, department));
  // if (!defaultUserInfo) {
  //   return <Loader />;
  // }
  const updateUser = async (data: CorporateUserInfo) => {
    updateDoc(doc(db.adminUserInfos, unit), data);
  };

  return <UserForm postUserInfo={updateUser} departments={departments} defaultValues={user} />;
}
