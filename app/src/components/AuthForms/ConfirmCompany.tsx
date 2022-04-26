import { functions } from "../../services/firebase";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import {
  ConfirmCompanyRequest,
  ConfirmCompanyResponse,
} from "../../../../functions/src/callable/company/confirmCompany";
import { companyName, getConfirmCompanyHashParamFromUrl } from "../../utils/url.utils";
import { AcceptInvite } from "./AcceptInvite";
import { Loader } from "../Loader/Loader";
import { AuthTitle, ErrorInfo } from "./style";

const confirmCompany = httpsCallable<ConfirmCompanyRequest, ConfirmCompanyResponse>(
  functions,
  "registration-confirmCompany"
);

export function ConfirmCompany(): JSX.Element {
  const [error, setError] = useState("");
  const [isCompanyVerified, setCompanyVerificationStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const confirmCompanyHash = getConfirmCompanyHashParamFromUrl();

  useEffect(() => {
    (async () => {
      if (!companyName || !confirmCompanyHash) {
        setError("Incorrect url");
        setLoading(false);
        return false;
      }

      const resultFromFunction = await confirmCompany({
        domain: companyName,
        confirmCompanyHash: confirmCompanyHash,
      });
      const confirmStatus = resultFromFunction.data;

      if (confirmStatus.error) {
        setError(confirmStatus.error);
      } else {
        setCompanyVerificationStatus(confirmStatus.isVerified);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (isCompanyVerified) {
    return <AcceptInvite skipConfirmation={true} />;
  }

  return (
    <>
      <AuthTitle>Create company status</AuthTitle>

      {!isCompanyVerified && <ErrorInfo>Something went wrong. Company not verified</ErrorInfo>}

      {!error && <ErrorInfo>{error}</ErrorInfo>}
    </>
  );
}
