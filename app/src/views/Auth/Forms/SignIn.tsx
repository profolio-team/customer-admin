import Button from "@mui/material/Button";
import { Box, Checkbox, FormControlLabel, Link, TextField, Typography } from "@mui/material";
import { auth, functions } from "../../../services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { redirectToEnterEmailPage } from "../../../utils/url.utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Loader } from "../../../components";
import {
  GetUserDomainByEmailRequest,
  GetUserDomainByEmailResponce,
} from "../../../../../functions/src/callable/user";

const formatErrorMessage = (errorMessage: string) => {
  errorMessage = errorMessage.replace("Firebase: Error (auth/", "");
  errorMessage = errorMessage.replace(").", "");
  errorMessage = errorMessage.replace("Firebase: ", "");
  errorMessage = errorMessage.split("-").join(" ");
  return errorMessage;
};

const getUserDomain = httpsCallable<GetUserDomainByEmailRequest, GetUserDomainByEmailResponce>(
  functions,
  "user-getUserDomainByEmail"
);

export function SignInForm(): JSX.Element {
  const urlParams = new URLSearchParams(window.location.search);
  const emailFromUrl = urlParams.get("email") || "";
  const navigate = useNavigate();

  const { isAuthorized, loading: authLoading } = useAuth();
  const [email, setEmail] = useState(emailFromUrl);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [signInWithEmailAndPassword, , , errorLogin] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (errorLogin?.message) {
      setError(formatErrorMessage(errorLogin?.message));
    }

    if (!authLoading && isAuthorized) {
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  }, [errorLogin, isAuthorized, authLoading]);

  const signIn = async () => {
    if (!email) {
      setError("Enter email");
      return;
    }
    setLoading(true);
    const userDomainInfo = await getUserDomain({ email });
    const { domain, error } = userDomainInfo.data;

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    if (domain && redirectToEnterEmailPage(domain, email)) {
      return;
    }

    if (!password) {
      setError("Enter password");
      setLoading(false);
      return;
    }

    signInWithEmailAndPassword(email, password);
  };

  if (authLoading || loading) {
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
          Sign In
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          disabled={!!emailFromUrl}
          id="email"
          type="email"
          placeholder="Enter corporate email"
          label={"Email adress"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          disabled={!emailFromUrl}
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
          checked
          control={<Checkbox disabled={!emailFromUrl} name="rememberMe" />}
          label="Remember me "
        />
        <Button variant="contained" onClick={signIn} sx={{ marginTop: "1rem" }}>
          Sign In
        </Button>

        {error && <p style={{ color: "var(--color-functional-error)" }}>Error: {error}</p>}
      </Box>
    </>
  );
}
