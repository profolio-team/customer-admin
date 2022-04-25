import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { functions } from "../../../services/firebase";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { SuccessResultPage } from "./SuccessResultPage";
import { redirectToMainPage } from "../../../utils/url.utils";
import { Loader } from "../../index";
import {
  RegisterCompanyRequest,
  RegisterCompanyResponce,
} from "../../../../../functions/src/callable/company/registerCompany";
import { AuthTitle, ErrorInfo } from "../style";
import { TermsAcceptControl } from "./TermsAcceptControl";

const registerCompany = httpsCallable<RegisterCompanyRequest, RegisterCompanyResponce>(
  functions,
  "registration-registerCompany"
);

export function CreateCompany(): JSX.Element {
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [error, setError] = useState("");
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  const signUp = async () => {
    setLoading(true);

    const resultFromFunction = await registerCompany({
      email,
      domain,
    });
    const { error } = resultFromFunction.data;
    setError(error);
    setSuccessfullyRegistered(!error);
    setLoading(false);
  };

  useEffect(() => {
    const isRedirecting = redirectToMainPage();
    setLoading(isRedirecting);
  }, []);

  if (successfullyRegistered) {
    return <SuccessResultPage email={email} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AuthTitle>Create account</AuthTitle>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          id="email"
          type="email"
          placeholder="Enter corporate email"
          label={"Email adress"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="domain"
          type="text"
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Domain name"
          label={"Domain"}
          value={domain}
        />

        {error && <ErrorInfo>{error}</ErrorInfo>}

        <TermsAcceptControl onChange={setAcceptedTerms} isEnabled={acceptedTerms} />

        <Button variant="contained" onClick={signUp} sx={{ marginTop: "1rem" }}>
          Create Account
        </Button>
      </Box>
    </>
  );
}
