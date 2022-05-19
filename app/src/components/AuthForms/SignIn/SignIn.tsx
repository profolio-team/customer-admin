import { auth, functions } from "../../../services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import {
  companyName,
  getEmailParamFromUrl,
  getPasswordParamFromUrl,
  redirectToSignInPage,
} from "../../../utils/url.utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Loader } from "../../index";
import {
  GetUserDomainByEmailRequest,
  GetUserDomainByEmailResponse,
} from "../../../../../functions/src/callable/user/getUserDomainByEmail";

import { Box, Button, TextField } from "@mui/material";
import { parseFirebaseErrorMessage } from "../../../services/firebase/errorMessages";
import { AuthTitle, ErrorInfo } from "../style";
import { SelectDomain } from "./SelectDomain";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const getUserDomain = httpsCallable<GetUserDomainByEmailRequest, GetUserDomainByEmailResponse>(
  functions,
  "user-getUserDomainByEmail"
);

type ISignIn = {
  email: string;
  password: string;
};

export function SignIn(): JSX.Element {
  const navigate = useNavigate();

  const emailFromUrl = getEmailParamFromUrl();
  const passwordFromUrl = getPasswordParamFromUrl();

  const [email, setEmail] = useState(emailFromUrl);
  const [password, setPassword] = useState(passwordFromUrl);
  const [domain, setDomain] = useState(companyName || "");

  const [domainList, setDomainList] = useState<string[]>([]);

  const { isAuthorized, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(emailFromUrl);
  const [signInWithEmailAndPassword, , , errorLogin] = useSignInWithEmailAndPassword(auth);

  const schemaEmail = yup.object({
    email: yup.string().required("Email is required to enter").email("Email is incorrect"),
  });

  const schemaPassword = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: yupResolver(schemaEmail ? schemaEmail : schemaPassword),
  });

  useEffect(() => {
    if (errorLogin?.message) {
      setError(parseFirebaseErrorMessage(errorLogin?.message));
      setLoading(false);
    }
  }, [errorLogin]);

  useEffect(() => {
    if (isAuthorized) {
      setLoading(true);
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  }, [isAuthorized]);

  const signIn = async (): Promise<void> => {
    setLoading(true);

    const userDomainInfo = await getUserDomain({ email });
    const { domains, error } = userDomainInfo.data;
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    if (!domain && domains.length > 1) {
      setDomainList(domains);
      setLoading(false);
      return;
    }

    const domainForRedirect = domain || domains[0];
    if (redirectToSignInPage({ domain: domainForRedirect, email })) {
      return;
    }

    await signInWithEmailAndPassword(email, password);
  };

  if (authLoading || loading) {
    return <Loader />;
  }

  const onSubmit = () => signIn();

  return (
    <>
      <AuthTitle>Sign In</AuthTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            id="email"
            type="text"
            placeholder="Enter corporate email"
            label={"Email address"}
            hidden={!!emailFromUrl}
            {...register("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
          />

          {!companyName && (
            <SelectDomain domainList={domainList} selectedDomain={domain} onChange={setDomain} />
          )}

          <TextField
            id="password"
            placeholder="Enter password"
            label={"Password"}
            type="password"
            hidden={!emailFromUrl}
            {...register("password")}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <ErrorInfo>{error}</ErrorInfo>}

          <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
            {!emailFromUrl ? "Continue" : "Sign In"}
          </Button>
        </Box>
      </form>
    </>
  );
}
