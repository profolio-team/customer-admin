import Button from "@mui/material/Button";
import { Box, TextField, Typography } from "@mui/material";
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
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const registerCompany = httpsCallable<RegisterCompanyRequest, RegisterCompanyResponce>(
  functions,
  "registration-registerCompany"
);

const Alphabet = "abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(Alphabet, 10);
const randromDomainName = nanoid();

export function SignUpForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [domain] = useState(randromDomainName);
  const [error, setError] = useState("");
  const [isVerifyEmail, verifyEmailMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getToken = async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return "";
    }

    return await executeRecaptcha("login");
  };

  const signUp = async () => {
    setLoading(true);
    const rootDomainUrl = getRootFullUrl();
    const fullDomainUrl = getFullUrlWithDomain(domain);
    const token = await getToken();

    const resultFromFunction = await registerCompany({
      email,
      domain,
      fullDomainUrl,
      rootDomainUrl,
      token,
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
          disabled
          placeholder="Domain name"
          label={"Domain"}
          value={domain}
        />

        {error && <p style={{ color: "var(--color-functional-error)" }}>Error: {error}</p>}
        <Button variant="contained" onClick={signUp} sx={{ marginTop: "1rem" }}>
          Create Account
        </Button>
      </Box>
    </>
  );
}
