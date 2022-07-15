import { useParams } from "react-router-dom";
import { invite } from "../../components/UserForm/inviteUser";
import { ErrorPage } from "../../components/ErrorPage/ErrorPage";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { doc } from "firebase/firestore";
import { changeUserCorporateInfo } from "../../utils/requests/updateUserCorporateInfo";
import { UserInfo } from "../../../../typescript-types/db.types";
import { UserCorporateInfoForm } from "../../components/Forms/UserCorporateInfoForm";

export function UserRouter() {
  const { param } = useParams();
  if (param === "invite") {
    return <UserCorporateInfoForm postUserInfo={invite} pageTitle={"User Invite"} />;
  }
  if (typeof param === "string") {
    const [user, loadingUser] = useDocumentOnce(doc(db.collections.users, param));
    if (loadingUser) {
      return <Loader />;
    }
    if (!user) {
      return <ErrorPage code={"404"} />;
    }
    const post = (data: UserInfo) => {
      return changeUserCorporateInfo({ data, uid: user.id });
    };
    return (
      <UserCorporateInfoForm
        postUserInfo={post}
        pageTitle={"User Invite"}
        defaultValues={user.data()}
      />
    );
  }
  return <ErrorPage code={"404"} />;
}
