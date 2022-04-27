import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  SetPasswordRequest,
  SetPasswordResponse,
} from "../../../../functions/src/callable/user/setPassword";
import { auth, functions } from "../../services/firebase";
import { httpsCallable } from "firebase/functions";
import {
  companyName,
  getEmailParamFromUrl,
  getResetPasswordUserHashParamFromUrl,
} from "../../utils/url.utils";
import { Loader } from "../Loader/Loader";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { AuthTitle, ErrorInfo } from "./style";
import { useAuth } from "../../hooks/useAuth";
import { parseFirebaseErrorMessage } from "../../services/firebase/errorMessages";
import { useNotification } from "../../hooks/useNotification";

const setPassword = httpsCallable<SetPasswordRequest, SetPasswordResponse>(
  functions,
  "user-setPassword"
);

export function SetPassword(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [signInWithEmailAndPassword, , , errorLogin] = useSignInWithEmailAndPassword(auth);

  const resetPasswordUserHash = getResetPasswordUserHashParamFromUrl();
  const emailFromUrl = getEmailParamFromUrl();
  const navigate = useNavigate();
  const { isAuthorized, loading: authLoading } = useAuth();
  const { showNotification } = useNotification();

  const [error, setError] = useState("");

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
        showNotification({
          message: "The password has been successfully changed",
          type: "success",
        });
      }, 100);
    }
  }, [isAuthorized]);

  const updatePassword = async () => {
    if (!companyName) {
      return;
    }
    setLoading(true);
    try {
      const acceptInviteReq = await setPassword({
        email: emailFromUrl,
        resetPasswordUserHash,
        password: passwordValue,
      });
      const acceptResult = acceptInviteReq.data;

      if (acceptResult.error) {
        setError(acceptResult.error);
        return setLoading(false);
      }
      await signInWithEmailAndPassword(emailFromUrl, passwordValue);
    } catch (e) {
      setError("Failed to set new password. Try again");
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <Loader />;
  }

  return (
    <>
      <AuthTitle>Set new password</AuthTitle>
      {error && <ErrorInfo>{error}</ErrorInfo>}
      <TextField
        id="email"
        type="email"
        placeholder="Enter corporate email"
        label={"Email adress"}
        value={emailFromUrl}
        hidden={true}
      />
      <TextField
        id="password"
        type="password"
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="password"
        label={"Password"}
        value={passwordValue}
      />
      <TextField
        id="password2"
        type="password"
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="password"
        label={"Password"}
        value={confirmPasswordValue}
      />
      <Button variant="contained" onClick={updatePassword} sx={{ marginTop: "1rem" }}>
        Set password
      </Button>
    </>
  );
}
