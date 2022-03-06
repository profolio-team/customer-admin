import Button from "@mui/material/Button";
import { FormControl, InputLabel, Stack } from "@mui/material";
import { addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { auth } from "../../services/firebase";
import { testDataTypeWithAllTypes } from "../../../../typescript-types/db.types";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useState } from "react";
import { Input } from "../../components/core";

export function AuthPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, userLogin, loadingLogin, errorLogin] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, userCreate, loadingCreate, errorCreate] =
    useCreateUserWithEmailAndPassword(auth);

  const loading = loadingLogin || loadingCreate;
  const error = errorLogin || errorCreate;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-content page-content__design-system">
      <h1>Authorization</h1>
      <Stack spacing={2} width="500px">
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="simple-input">
            Email
          </InputLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alisa@gmail.com" id="email" />
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
        <Button variant="contained" onClick={() => signInWithEmailAndPassword(email, password)}>
          Sign In
        </Button>
        <Button variant="contained" onClick={() => createUserWithEmailAndPassword(email, password)}>
          Register
        </Button>
      </Stack>

      <div>
        <p>{error?.message && `Error: ${error?.message}`}</p>
      </div>
    </div>
  );
}
