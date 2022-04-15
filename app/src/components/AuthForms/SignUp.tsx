import Button from "@mui/material/Button";
import { Box, Checkbox, Link, TextField, Typography } from "@mui/material";
import { customAlphabet } from "nanoid";
import { functions } from "../../services/firebase";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { VerifyEmail } from "./VerifyEmail";
import { getFullUrlWithDomain, getRootFullUrl, redirectToMainPage } from "../../utils/url.utils";
import { Loader } from "../index";
import {
  RegisterCompanyRequest,
  RegisterCompanyResponce,
} from "../../../../functions/src/callable/company";
import { TermsInfo } from "./style";

const registerCompany = httpsCallable<RegisterCompanyRequest, RegisterCompanyResponce>(
  functions,
  "registration-registerCompany"
);

const Alphabet = "abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(Alphabet, 10);
const randromDomainName = nanoid();

export function SignUpForm(): JSX.Element {
  const [email, setEmail] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const customDomainName = urlParams.get("customDomainName") === "1";

  const [domain, setDomain] = useState(customDomainName ? "" : randromDomainName);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isVerifyEmail, verifyEmailMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    const rootDomainUrl = getRootFullUrl();
    const fullDomainUrl = getFullUrlWithDomain(domain);

    const resultFromFunction = await registerCompany({
      email,
      domain,
      fullDomainUrl,
      rootDomainUrl,
    });
    const { result, error } = resultFromFunction.data;
    console.log("registerCompany result:", result);

    if (error) {
      setError(error);
    } else {
      verifyEmailMode(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    redirectToMainPage();
  }, []);

  if (isVerifyEmail) {
    return <VerifyEmail email={email} />;
  }

  if (loading) {
    return <Loader />;
  }

  const isValidEmail = email !== "";
  const isValidDomain = domain !== "";
  const isValidForm = acceptedTerms && isValidEmail && isValidDomain;

  return (
    <>
      <Box>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Create account
        </Typography>
      </Box>

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
          hidden={customDomainName ? false : true}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Domain name"
          label={"Domain"}
          value={domain}
        />

        {error && <p style={{ color: "var(--color-functional-error)" }}>Error: {error}</p>}

        <TermsInfo>
          <Checkbox
            value={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            name="terms"
            style={{ margin: "-7px 0 0 -10px" }}
          />
          <Box>
            <Typography variant="body2" component="p">
              By creating an account, you agree to our
              <Link href="#" variant="body2">
                Terms of Service
              </Link>
              and have read and understood the
              <Link href="#" variant="body2">
                Privacy Policy.
              </Link>
            </Typography>
          </Box>
        </TermsInfo>

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
