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
  RegisterCompanyResponse,
} from "../../../../../functions/src/callable/company/registerCompany";
import { AuthTitle, ErrorInfo } from "../style";
import { TermsAcceptControl } from "./TermsAcceptControl";
import { customAlphabet } from "nanoid";

const registerCompany = httpsCallable<RegisterCompanyRequest, RegisterCompanyResponse>(
  functions,
  "registration-registerCompany"
);

const domainNameRandom = customAlphabet("1234567890", 7)();

export function CreateCompany(): JSX.Element {
  const urlParams = new URLSearchParams(window.location.search);
  const customDomain = !!urlParams.get("customDomain");

  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [error, setError] = useState("");
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  const signUp = async () => {
    setLoading(true);

    try {
      const clearUserName = email
        .split("@")[0]
        .replace(/[^a-zA-Z]+/g, "")
        .toLocaleLowerCase();
      const randomDomainName = `${clearUserName}-${domainNameRandom}`;

      const domainName = customDomain ? domain : randomDomainName;

      const resultFromFunction = await registerCompany({
        email,
        domain: domainName,
      });
      const { error } = resultFromFunction.data;
      setError(error);
      setSuccessfullyRegistered(!error);
    } catch (e) {
      setError("Something went wrong. Try latter");
    }

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

  const isValidDomain = customDomain ? domain.length > 3 : true;
  const isValidForm = acceptedTerms && email.includes("@") && isValidDomain;

  return (
    <>
      <AuthTitle>Create account</AuthTitle>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          id="email"
          type="email"
          placeholder="Enter corporate email"
          label={"Email address"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          hidden={!customDomain}
          id="domain"
          type="text"
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Domain name"
          label={"Domain"}
          value={domain}
        />

        {error && <ErrorInfo>{error}</ErrorInfo>}

        <TermsAcceptControl onChange={setAcceptedTerms} isEnabled={acceptedTerms} />

        <Button
          disabled={!isValidForm}
          variant="contained"
          onClick={signUp}
          sx={{ marginTop: "1rem" }}
        >
          Create Account
        </Button>
      </Box>
    </>
  );
}
