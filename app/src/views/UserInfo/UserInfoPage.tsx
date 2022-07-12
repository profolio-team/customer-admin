import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import db from "../../services/firebase/firestore";
import { UserPersonalInfoForm } from "./UserPersonalInfoForm";
import { User } from "firebase/auth";
export function UserInfoPage() {
  const { user, uid } = useAuth();
  if (user && uid) {
    return UserInfoConnectDB(uid, user);
  }
  return <Loader />;
}
export function UserInfoConnectDB(uid: string, user: User): JSX.Element {
  const [userInfoDB] = useDocumentData(doc(db.collections.users, uid));
  if (!userInfoDB || !user) {
    return <Loader />;
  }
  return <UserPersonalInfoForm user={user} userInfo={userInfoDB} uid={uid} />;
}
