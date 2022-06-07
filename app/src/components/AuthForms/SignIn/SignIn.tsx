import { auth, functions } from "../../../services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import {
  getEmailParamFromUrl,
  getPasswordParamFromUrl,
  redirectToSignInPage,
} from "../../../utils/url.utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  GetUserDomainByEmailRequest,
  GetUserDomainByEmailResponse,
} from "../../../../../functions/src/callable/user/getUserDomainByEmail";
import { SignInForm } from "../../Forms/SignInForm";
import { SelectDomain } from "./SelectDomain";

const getUserDomain = httpsCallable<GetUserDomainByEmailRequest, GetUserDomainByEmailResponse>(
  functions,
  "user-getUserDomainByEmail"
);

export function SignIn(): JSX.Element {
  const navigate = useNavigate();

  const emailFromUrl = getEmailParamFromUrl();
  const passwordFromUrl = getPasswordParamFromUrl();
  const [domainList, setDomainList] = useState<string[]>([]);
  const { isAuthorized } = useAuth();
  const [email, setEmail] = useState("");

  const [signInWithEmailAndPassword, , , errorLogin] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (isAuthorized) {
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  }, [isAuthorized]);

  const redirect = (selectDomain: string) => {
    redirectToSignInPage({ domain: selectDomain, email });
  };

  const postEmail = async (email: string): Promise<void> => {
    const userDomainInfo = await getUserDomain({ email });
    const { domains, error } = userDomainInfo.data;
    if (error) {
      return new Promise((resolve, reject) => {
        reject(new Error(error));
      });
    }
    if (domains.length > 1) {
      setDomainList(domains);
      setEmail(email);
      return;
    }
    redirectToSignInPage({ domain: domains[0], email });
  };
  if (domainList.length > 1) {
    return <SelectDomain domainList={domainList} redirect={redirect} />;
  }
  if (!emailFromUrl) {
    return <SignInForm signIn={postEmail} />;
  }

  return (
    <SignInForm
      signIn={signInWithEmailAndPassword}
      emailFromUrl={emailFromUrl}
      passwordFromUrl={passwordFromUrl}
      error={errorLogin}
    />
  );
}
