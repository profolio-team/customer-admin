import Button from "@mui/material/Button";
import { Box, Checkbox, FormControlLabel, Link, TextField, Typography } from "@mui/material";
import { auth, functions, signInByGoogle } from "../../../services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { ExternalServiceSignIn } from "../style";
import { httpsCallable } from "firebase/functions";

const formatErrorMessage = (errorMessage: string) => {
  errorMessage = errorMessage.replace("Firebase: Error (auth/", "");
  errorMessage = errorMessage.replace(").", "");
  errorMessage = errorMessage.replace("Firebase: ", "");
  errorMessage = errorMessage.split("-").join(" ");
  return errorMessage;
};

const getUserDomain = httpsCallable(functions, "user-getDomainByEmail");
const redirectToDomain = (domain: string, email: string) => {
  const isLocalhost = location.host.includes("localhost");
  const countOfDomain = location.host.split(".").length;

  const isInvalidLocalhostUrl = isLocalhost && countOfDomain >= 2;
  const isInvalidExternalUrl = !isLocalhost && countOfDomain >= 3;

  let clearHost = location.host;

  if (isInvalidLocalhostUrl || isInvalidExternalUrl) {
    clearHost = clearHost.replace(location.host.split(".")[0] + ".", "");
  }
  const protocol = isLocalhost ? "http" : "https";
  const urlForRedirect = `${protocol}://${domain}.${clearHost}/sign-in?email=${email}`;
  if (window.location.href !== urlForRedirect) {
    window.location.href = urlForRedirect;
    return true;
  }
  return false;
};

export function SignInForm(): JSX.Element {
  const urlParams = new URLSearchParams(window.location.search);
  const emailFromUrl = urlParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [signInWithEmailAndPassword, , , errorLogin] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (errorLogin?.message) {
      setError(formatErrorMessage(errorLogin?.message));
    }
  }, [errorLogin]);

  const signIn = async () => {
    if (!email) {
      setError("Enter email");
      return;
    }

    const userDomainInfo = await getUserDomain({ email });
    const { domain, error } = userDomainInfo.data as { domain: string; error: string };

    if (!domain) {
      setError(error);
      return;
    }

    if (redirectToDomain(domain, email)) {
      return;
    }

    if (!password) {
      setError("Enter password");
      return;
    }

    signInWithEmailAndPassword(email, password);
  };

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
          Sign In
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          style={{ opacity: emailFromUrl ? 0.1 : 1 }}
          id="email"
          type="email"
          placeholder="Enter corporate email"
          label={"Email adress"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          style={{ opacity: !emailFromUrl ? 0.1 : 1 }}
          id="password"
          type="password"
          placeholder="Enter password"
          label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link style={{ opacity: !emailFromUrl ? 0.1 : 1 }} href="/restore-password" variant="body2">
          Forgot password?
        </Link>
        <FormControlLabel
          style={{ opacity: !emailFromUrl ? 0.1 : 1 }}
          checked
          control={<Checkbox name="rememberMe" />}
          label="Remember me "
        />
        <Button variant="contained" onClick={signIn} sx={{ marginTop: "1rem" }}>
          Sign In
        </Button>

        {error && <p style={{ color: "var(--color-functional-error)" }}>Error: {error}</p>}

        <ExternalServiceSignIn
          onClick={(e) => {
            e.preventDefault();
            signInByGoogle();
          }}
          href="#"
        >
          <GoogleIcon />
          <span>Sign in using Google</span>
        </ExternalServiceSignIn>
      </Box>
    </>
  );
}
