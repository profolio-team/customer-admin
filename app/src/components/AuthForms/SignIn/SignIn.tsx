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

const getUserDomain = httpsCallable<GetUserDomainByEmailRequest, GetUserDomainByEmailResponse>(
  functions,
  "user-getUserDomainByEmail"
);

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

  const [signInWithEmailAndPassword, , , errorLogin] = useSignInWithEmailAndPassword(auth);

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

  return (
    <>
      <AuthTitle>Sign In</AuthTitle>

      <form onSubmit={() => signIn()}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            id="email"
            type="email"
            placeholder="Enter corporate email"
            label={"Email address"}
            hidden={!!emailFromUrl}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
