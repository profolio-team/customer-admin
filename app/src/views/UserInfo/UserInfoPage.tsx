import { documentId, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import db from "../../services/firebase/firestore";
import { UserPersonalInfoForm } from "./UserPersonalInfoForm";

export function UserInfoPage(): JSX.Element {
  const { uid, user } = useAuth();
  const [userInfoDB] = useCollection(query(db.collections.users, where(documentId(), "==", uid)));
  console.log("userInfo:");
  console.log(userInfoDB);
  console.log("uid:");
  console.log(uid);
  console.log("user:");
  console.log(user);
  if (!userInfoDB || !user) {
    return <Loader />;
  }

  return (
    <UserPersonalInfoForm
      user={user}
      userInfo={userInfoDB.docs.map((d) => d.data())[0]}
      uid={uid}
    />
  );
}
