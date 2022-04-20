import { UserForm } from "./UserForm";
import { CorporateUserInfo } from "../../../../typescript-types/db.types";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { useParams } from "react-router-dom";
import { DepartmentFields } from "./UsersPage";
import { FullUserInfo } from "./AllUsers";

interface ChangeUserProps {
  departments: DepartmentFields[];
  user: FullUserInfo;
}

export function ChangeUser({ departments, user }: ChangeUserProps) {
  const { unit } = useParams();
  const updateUser = async (data: CorporateUserInfo) => {
    await updateDoc(doc(db.adminUserInfos, unit), data);
  };

  return <UserForm postUserInfo={updateUser} departments={departments} defaultValues={user} />;
}
