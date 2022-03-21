import Button from "@mui/material/Button";
import { Box, Checkbox, FormControlLabel, Link, TextField, Typography } from "@mui/material";
import { auth, signInByGoogle } from "../../../services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { ExternalServiceSignIn } from "../style";

const formatErrorMessage = (errorMessage: string) => {
  errorMessage = errorMessage.replace("Firebase: Error (auth/", "");
  errorMessage = errorMessage.replace(").", "");
  errorMessage = errorMessage.replace("Firebase: ", "");
  errorMessage = errorMessage.split("-").join(" ");
  return errorMessage;
};

export function SignInForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, , loadingLogin, errorLogin] =
    useSignInWithEmailAndPassword(auth);

  if (loadingLogin) {
    return <p>Loading...</p>;
  }

  const signIn = () => {
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
          id="email"
          type="email"
          placeholder="Enter corporate email"
          label={"Email adress"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="password"
          type="password"
          placeholder="Enter password"
          label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link href="/restore-password" variant="body2">
          Forgot password?
        </Link>
        <FormControlLabel checked control={<Checkbox name="rememberMe" />} label="Remember me " />
        <Button variant="contained" onClick={signIn} sx={{ marginTop: "1rem" }}>
          Sign In
        </Button>

        {errorLogin?.message && (
          <p style={{ color: "var(--color-functional-error)" }}>
            Error: {formatErrorMessage(errorLogin?.message || "")}
          </p>
        )}

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
