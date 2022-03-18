import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import { Inputs, UserInfoForm } from "./userInfoForm";

export function UserInfoPage(): JSX.Element {
  const [preloadedValues, setPreloadedValues] = useState<Inputs | null>(null);
  const { isAuthorized, uid, userInfo } = useAuth();
  const [userInfoDB, loading] = useDocumentData(isAuthorized ? doc(db.users, uid) : null, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    console.log(loading);
    if (!loading) {
      console.log("loading end");
      if (userInfoDB) {
        console.log("userDB true");
        setPreloadedValues({
          firstName: userInfoDB.firstName || "",
          about: userInfoDB.about || "",
          email: userInfo.email || "",
          lastName: userInfoDB.lastName || "",
          linkedIn: userInfoDB.linkedInUrl || "",
          phone: userInfoDB.phone || "",
        });
      } else {
        console.log("userDB false");
        setPreloadedValues({
          firstName: "",
          about: "",
          email: userInfo.email || "",
          lastName: "",
          linkedIn: "",
          phone: "",
        });
      }
    }
    console.log(preloadedValues);
  }, [loading]);

  return !loading && preloadedValues ? (
    <UserInfoForm preloadedValues={preloadedValues} />
  ) : (
    <>Loading...</>
  );
}
