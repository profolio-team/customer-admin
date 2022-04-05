import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { CompanyInfoForm } from "./CompanyInfoForm";

export function CompanyInfoPage(): JSX.Element {
  const [companyInfoDB] = useDocumentData(doc(db.config, "CompanyInfo"));

  if (!companyInfoDB) {
    return <>Loading...</>;
  }

  return <CompanyInfoForm companyInfoDB={companyInfoDB} />;
}
