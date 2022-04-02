import { useAuth } from "../../hooks/useAuth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { useEffect, useState } from "react";
import { CompanyInfoForm, InputsCompanyInfo } from "./CompanyInfoForm";

export function CompanyInfoPage(): JSX.Element {
  const [readyForDisplay, setReady] = useState(false);

  const [preloadedValues, setPreloadedValues] = useState<InputsCompanyInfo>({
    template: "",
    name: "",
    phone: "",
    email: "",
    about: "",
    logoUrl: "",
  });

  const { isAuthorized, userInfo, loading: loadingAuth, user, uid } = useAuth();

  const [userCompanyDB, loading] = useDocumentData(
    isAuthorized ? doc(db.config, "CompanyInfo") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

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
    if (userCompanyDB) {
      setPreloadedValues({
        template: userCompanyDB.template || "",
        about: userCompanyDB.about || "",
        email: userCompanyDB.email || "",
        logoUrl: userCompanyDB.logoUrl || "",
        name: userCompanyDB.name || "",
        phone: userCompanyDB.phone || "",
      });
    }
    setReady(true);
  }, [loading]);

  return readyForDisplay && user ? (
    <CompanyInfoForm preloadedValues={preloadedValues} uid={uid} />
  ) : (
    <>Loading...</>
  );
}
