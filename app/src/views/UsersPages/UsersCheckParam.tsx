import { useParams } from "react-router-dom";
import { AdminUserForm } from "../../components/AdminUserForm/AdminUserFormFields";
import { invite } from "../../components/UserForm/inviteUser";

export function UsersCheckParam() {
  const { param } = useParams();
  if (param === "invite") {
    return <AdminUserForm postUserInfo={invite} />;
  }
  return <></>;
}
