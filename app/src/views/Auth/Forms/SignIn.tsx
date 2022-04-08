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
import { UserCredentials, SignInForm } from "./SignInForm";

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

export function SignIn(): JSX.Element {
  const urlParams = new URLSearchParams(window.location.search);
  const emailFromUrl = urlParams.get("email") || "";
  const navigate = useNavigate();
  const { isAuthorized, loading: authLoading } = useAuth();
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

  const signIn = async ({ email, password }: UserCredentials): Promise<void> => {
    setLoading(true);
    const userDomainInfo = await getUserDomain({ email });
    const { domain, error } = userDomainInfo.data;

    if (error) {
      setLoading(false);
      setError(error);
      return;
    }

    if (domain && redirectToEnterEmailPage(domain, email)) {
      setLoading(false);
      return;
    }
    signInWithEmailAndPassword(email, password);
    setLoading(false);
  };

  if (authLoading || loading) {
    return <Loader />;
  }

  return <SignInForm signIn={signIn} emailFromUrl={emailFromUrl} error={error} />;
}
