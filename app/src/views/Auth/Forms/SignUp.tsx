import Button from "@mui/material/Button";
import { Box, Link, Stack, TextField, Typography } from "@mui/material";
import { functions, signInByGoogle } from "../../../services/firebase";
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

export function SignUpForm(): JSX.Element {
  const [email, setEmail] = useState("dmowski@yandex.ru");
  const [password, setPassword] = useState(Date.now() + "password");
  const [domain, setDomain] = useState("company" + Date.now() + "end");
  const [error, setError] = useState("");
  const [isVerifyEmail, verifyEmailMode] = useState(false);

  const registerCompany = httpsCallable(functions, "registerCompany");

  const signUp = async () => {
    const resultFromFunction = await registerCompany({ email, domain });
    const { result, error } = resultFromFunction.data as { result: string; error: string };
    if (error) {
      setError(error);
    } else {
      verifyEmailMode(true);
      setError("");
    }
    console.log("result of registerCompany", result);
  };

  useEffect(() => {
    const isSubDomain = location.host.split(".").length > 1;
    if (isSubDomain) {
      const urlWithoutSubdomain = location
        .toString()
        .replace(location.host.split(".")[0] + ".", "");

      window.location.href = urlWithoutSubdomain;
    }
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
          id="password"
          type="password"
          placeholder="Enter password"
          label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          id="domain"
          type="text"
          placeholder="Enter domain name"
          label={"Domain"}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />

        {error && (
          <p style={{ color: "var(--color-functional-error)" }}>
            Error: {formatErrorMessage(error || "")}
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
