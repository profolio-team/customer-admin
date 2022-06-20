import { useParams } from "react-router-dom";
import { UserCompanyInfoForm } from "../../components/AdminUserForm/UserCompanyInfoForm";
import { invite } from "../../components/UserForm/inviteUser";
import { ErrorPage } from "../../components/ErrorPage/ErrorPage";

export function UserRouter() {
  const { param } = useParams();
  if (param === "invite") {
    return <UserCompanyInfoForm postUserInfo={invite} pageTitle={"User Invite"} />;
  }
  return <ErrorPage code={"404"} />;
}
