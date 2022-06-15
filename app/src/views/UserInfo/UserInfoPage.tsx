import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import db from "../../services/firebase/firestore";
import { UserPersonalInfoForm } from "./UserPersonalInfoForm";

export function UserInfoPage(): JSX.Element {
  const { uid, user } = useAuth();
  const [userInfoDB] = useDocumentData(doc(db.users, uid));

  if (!userInfoDB || !user) {
    return <Loader />;
  }

  return <UserPersonalInfoForm user={user} userInfo={userInfoDB} uid={uid} />;
}
