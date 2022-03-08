import Button from "@mui/material/Button";
import { FormControl, InputLabel, Stack } from "@mui/material";
import { auth } from "../../services/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useState } from "react";
import { Input } from "../../components/core";

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
    <div className="page-content page-content__design-system">
      <h1>Authorization</h1>
      <Stack spacing={2} width="500px">
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="simple-input">
            Email
          </InputLabel>
          <Input
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
          <Input
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </FormControl>
      </Stack>
      <Stack spacing={2} direction="row">
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
    </div>
  );
}
