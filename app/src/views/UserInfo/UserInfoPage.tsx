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
    return UserInfoPage1(uid, user);
  }
  return <Loader />;
}
export function UserInfoPage1(uid: string, user: User): JSX.Element {
  const [userInfoDB] = useDocumentData(doc(db.collections.users, uid));
  console.log("userInfo:");
  console.log(userInfoDB);
  console.log("uid:");
  console.log(uid);
  console.log("user:");
  console.log(user);
  if (!userInfoDB || !user) {
    return <Loader />;
  }

  return <UserPersonalInfoForm user={user} userInfo={userInfoDB} uid={uid} />;
}
