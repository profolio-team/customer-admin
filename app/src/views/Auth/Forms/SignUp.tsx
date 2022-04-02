import Button from "@mui/material/Button";
import { Box, Link, Stack, TextField, Typography } from "@mui/material";
import { functions, signInByGoogle } from "../../../services/firebase";
import { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { ExternalServiceSignIn } from "../style";
import { httpsCallable } from "firebase/functions";

const getRootDomainUrl = () => {
  const isLocalhost = location.host.includes("localhost");
  const countOfDomain = location.host.split(".").length;

  const isInvalidLocalhostUrl = isLocalhost && countOfDomain >= 2;
  const isInvalidExternalUrl = !isLocalhost && countOfDomain >= 3;

  let clearHost = location.host;

  if (isInvalidLocalhostUrl || isInvalidExternalUrl) {
    clearHost = clearHost.replace(location.host.split(".")[0] + ".", "");
  }
  const protocol = isLocalhost ? "http" : "https";
  return `${protocol}://${clearHost}/`;
};

const getFullDomainUrl = (domain: string) => {
  const isLocalhost = location.host.includes("localhost");
  const countOfDomain = location.host.split(".").length;

  const isInvalidLocalhostUrl = isLocalhost && countOfDomain >= 2;
  const isInvalidExternalUrl = !isLocalhost && countOfDomain >= 3;

  let clearHost = location.host;

  if (isInvalidLocalhostUrl || isInvalidExternalUrl) {
    clearHost = clearHost.replace(location.host.split(".")[0] + ".", "");
  }
  const protocol = isLocalhost ? "http" : "https";
  return `${protocol}://${domain}.${clearHost}/`;
};

const registerCompany = httpsCallable(functions, "registration-registerCompany");

interface RegisterCompanyResult {
  result: string;
  verifyEmailLink: string;
  error: string;
}

const redirectToMainPage = () => {
  const isLocalhost = location.host.includes("localhost");
  const countOfDomain = location.host.split(".").length;
  const isInvalidLocalhostUrl = isLocalhost && countOfDomain >= 2;
  const isInvalidExternalUrl = !isLocalhost && countOfDomain >= 3;

  if (isInvalidLocalhostUrl || isInvalidExternalUrl) {
    const urlWithoutSubdomain = location.toString().replace(location.host.split(".")[0] + ".", "");

    window.location.href = urlWithoutSubdomain;
  }
};

export function SignUpForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [verifyLink, setVerifyEmailLink] = useState("");
  const [isVerifyEmail, verifyEmailMode] = useState(false);

  const signUp = async () => {
    const rootDomainUrl = getRootDomainUrl();
    const fullDomainUrl = getFullDomainUrl(domain);

    const resultFromFunction = await registerCompany({
      email,
      domain,
      fullDomainUrl,
      rootDomainUrl,
    });
    const { result, error, verifyEmailLink } = resultFromFunction.data as RegisterCompanyResult;
    console.log("registerCompany result:", result);

    if (error) {
      setError(error);
    } else {
      verifyEmailMode(true);
      setVerifyEmailLink(verifyEmailLink);
    }
  };

  useEffect(() => {
    redirectToMainPage();
  }, []);

  if (isVerifyEmail) {
    return (
      <>
        <Stack gap={3} sx={{ maxWidth: "400px", paddingBottom: "3rem" }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: "center",
            }}
          >
            Please verify your email
          </Typography>

          <Typography variant="body1" component="p">
            You're almost there! We sent an email to <b>{email}</b>. Just click on the link in that
            email to complete your sign up.
          </Typography>

          <Typography variant="body1" component="p">
            If you don't see the email, please check it under your junk, spam, social or other
            folders.
          </Typography>

          <Link href="#" variant="body2">
            I didn't receive the email.
          </Link>
          <hr />
          <Typography variant="body1" component="p">
            Domain: {getFullDomainUrl(domain)}
          </Typography>

          <Link href={verifyLink} target={"_blank"} variant="body2">
            TEST: verifyEmailLink
          </Link>
        </Stack>
      </>
    );
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
          Sign Up
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
          placeholder="Enter domain name"
          label={"Domain"}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />

        {error && <p style={{ color: "var(--color-functional-error)" }}>Error: {error}</p>}

        <Button variant="contained" onClick={signUp} sx={{ marginTop: "1rem" }}>
          Sign Up
        </Button>

        <ExternalServiceSignIn
          onClick={(e) => {
            e.preventDefault();
            signInByGoogle();
          }}
          href="#"
        >
          <GoogleIcon />
          <span>Sign up using Google</span>
        </ExternalServiceSignIn>
      </Box>
    </>
  );
}
