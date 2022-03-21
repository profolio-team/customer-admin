import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import { Inputs, UserInfoForm } from "./userInfoForm";

export function UserInfoPage(): JSX.Element {
  const [readyForDisplay, setReady] = useState(false);

  const [preloadedValues, setPreloadedValues] = useState<Inputs>({
    firstName: "",
    about: "",
    email: "",
    lastName: "",
    linkedIn: "",
    phone: "",
    avatar: "",
  });

  const { isAuthorized, uid, userInfo, loading: loadingAuth, user } = useAuth();

  const [userInfoDB, loading] = useDocumentData(isAuthorized ? doc(db.users, uid) : null, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (!loadingAuth) {
      setPreloadedValues({
        ...preloadedValues,
        email: userInfo.email || "",
      });
    }

    if (loading || loadingAuth) {
      return;
    }
    if (userInfoDB) {
      setPreloadedValues({
        avatar: user?.photoURL || "",
        firstName: userInfoDB.firstName || "",
        about: userInfoDB.about || "",
        email: userInfo.email || "",
        lastName: userInfoDB.lastName || "",
        linkedIn: userInfoDB.linkedInUrl || "",
        phone: userInfoDB.phone || "",
      });
    }
    setReady(true);
  }, [loading]);

  return readyForDisplay && user ? (
    <UserInfoForm user={user} preloadedValues={preloadedValues} uid={uid} />
  ) : (
    <>Loading...</>
  );
}
