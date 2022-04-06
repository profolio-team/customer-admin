import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { CompanyInfoForm } from "./CompanyInfoForm";

export function CompanyInfoPage(): JSX.Element {
  const [companyInfoDB] = useDocumentData(doc(db.config, "companyInfo"));

  if (!companyInfoDB) {
    return <Loader />;
  }

  return <CompanyInfoForm companyInfo={companyInfoDB} />;
}
