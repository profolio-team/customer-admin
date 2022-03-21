import Button from "@mui/material/Button";
import { Box, TextField, Typography } from "@mui/material";
import { auth, signInByGoogle } from "../../../services/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
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

export function SignUpForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword, , loadingCreate, errorCreate] =
    useCreateUserWithEmailAndPassword(auth);

  if (loadingCreate) {
    return <p>Loading...</p>;
  }

  const signUp = () => {
    createUserWithEmailAndPassword(email, password);
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
          id="password"
          type="password"
          placeholder="Enter password"
          label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorCreate?.message && (
          <p style={{ color: "var(--color-functional-error)" }}>
            Error: {formatErrorMessage(errorCreate?.message || "")}
          </p>
        )}

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
