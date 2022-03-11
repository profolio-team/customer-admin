import Button from "@mui/material/Button";
import { Box, FormControl, InputBase, InputLabel, Stack, Typography } from "@mui/material";
import { auth } from "../../services/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useState } from "react";
import { Header } from "../../components/core";

export function AuthPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Sign In Process");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, , loadingLogin, errorLogin] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, , loadingCreate, errorCreate] =
    useCreateUserWithEmailAndPassword(auth);

  const loading = loadingLogin || loadingCreate;

  if (loading) {
    return <p>Loading...</p>;
  }

  const signIn = () => {
    signInWithEmailAndPassword(email, password);
    setType("Sign In Process");
  };

  const signUp = () => {
    createUserWithEmailAndPassword(email, password);
    setType("Sign Up Process");
  };
  let errorMessage = "";
  if (type === "Sign In Process") {
    errorMessage = errorLogin?.message || "";
  } else {
    errorMessage = errorCreate?.message || "";
  }

  errorMessage = errorMessage.replace("Firebase: Error (auth/", "");
  errorMessage = errorMessage.replace(").", "");
  errorMessage = errorMessage.replace("Firebase: ", "");

  errorMessage = errorMessage.split("-").join(" ");

  return (
    <Box sx={{ backgroundColor: "#3495d4", height: "100vh" }}>
      <Header />

      <Box
        maxWidth="sm"
        sx={{
          width: "100%",
          maxWidth: "350px",
          height: "300px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          borderRadius: "5px",
          padding: "2.9rem 4rem",
          margin: "auto",
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "var(--color-neutral-1)",
        }}
      >
        <Box>
          <Typography variant="h2" component="h2">
            Authorization
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="simple-input">
              Email
            </InputLabel>
            <InputBase
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alisa@gmail.com"
              id="email"
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="simple-input">
              Password
            </InputLabel>
            <InputBase
              value={password}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </FormControl>
        </Box>
        <Stack spacing={2} direction="row" gap={"1rem"}>
          <Button variant="contained" onClick={signIn}>
            Sign In
          </Button>
          <Button variant="contained" onClick={signUp}>
            Register
          </Button>
        </Stack>

        <div>
          {errorMessage && (
            <p>
              Error in {type}: {errorMessage}
            </p>
          )}
        </div>
      </Box>
    </Box>
  );
}
