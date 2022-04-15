import Button from "@mui/material/Button";
import { Box, TextField, Typography } from "@mui/material";
import { functions, auth } from "../../services/firebase";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Loader } from "../index";
import {
  ConfirmCompanyRequest,
  ConfirmCompanyResponce,
} from "../../../../functions/src/callable/company";
import { fromBase64 } from "../../utils/converters";
import { companyName } from "../../utils/url.utils";
import {
  AcceptInviteRequest,
  AcceptInviteResponce,
  InviteStatusRequest,
  InviteStatusResponce,
} from "../../../../functions/src/callable/user";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

const confirmCompany = httpsCallable<ConfirmCompanyRequest, ConfirmCompanyResponce>(
  functions,
  "registration-confirmCompany"
);

const getUserInviteStatus = httpsCallable<InviteStatusRequest, InviteStatusResponce>(
  functions,
  "user-getInviteStatus"
);

const acceptInvite = httpsCallable<AcceptInviteRequest, AcceptInviteResponce>(
  functions,
  "user-acceptInvite"
);

export function ConfirmCompanyForm(): JSX.Element {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordMode, createNewPasswordMode] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [confrimCompanyStatus, setConfirmCompanyStatus] = useState<ConfirmCompanyResponce>({});
  const [signInWithEmailAndPassword, , , errorLogin] = useSignInWithEmailAndPassword(auth);

  const urlParams = new URLSearchParams(window.location.search);
  const confirmCompanyHash = urlParams.get("confirmCompanyHash") || "";
  const confirmUserHash = urlParams.get("confirmUserHash") || "";

  let emailFromUrl = urlParams.get("email");
  emailFromUrl = emailFromUrl ? fromBase64(emailFromUrl) : "";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const singIn = async () => {
    const acceptInviteReq = await acceptInvite({
      email: emailFromUrl || "",
      confirmUserHash: confirmUserHash,
      domain: companyName || "",
      password,
    });
    const acceptResult = acceptInviteReq.data;

    if (acceptResult.error) {
      setError(acceptResult.error);
    } else {
      await signInWithEmailAndPassword(emailFromUrl || "", password);
      if (!errorLogin) {
        navigate("/");
        showNotification({
          message: "Succesully created compny",
          type: "success",
        });
      }
    }
  };

  const initCompany = async () => {
    if (!companyName || !confirmCompanyHash) {
      setError("Incorrect url");
      return false;
    }
    setLoading(true);

    const resultFromFunction = await confirmCompany({
      domain: companyName || "",
      confirmCompanyHash: confirmCompanyHash,
    });
    const confirmStatus = resultFromFunction.data;
    setConfirmCompanyStatus(confirmStatus);

    setLoading(false);
    return confirmStatus.isVerified;
  };

  const isNewUser = async () => {
    console.log("emailFromUrl", emailFromUrl);
    console.log("confirmUserHash", confirmUserHash);

    const statusRequest = await getUserInviteStatus({
      email: emailFromUrl || "",
      confirmUserHash: confirmUserHash,
      domain: companyName || "",
    });

    const result = statusRequest.data;
    if (result.error) {
      setError(result.error);
    }

    return !!result.isNewUser;
  };

  useEffect(() => {
    (async () => {
      const isCompanyVerified = await initCompany();
      if (isCompanyVerified) {
        const needToCreatePassword = await isNewUser();
        createNewPasswordMode(needToCreatePassword);
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
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
          Set password
        </Typography>
      </Box>
      {confrimCompanyStatus.error && (
        <p style={{ color: "var(--color-functional-error)" }}>
          Error: {confrimCompanyStatus.error}
        </p>
      )}

      {errorLogin && (
        <p style={{ color: "var(--color-functional-error)" }}>errorLogin: {errorLogin}</p>
      )}

      {confrimCompanyStatus.isVerified && (
        <p>
          Company successfylly verified: <br />
          {confrimCompanyStatus.isVerified && newPasswordMode && (
            <i>For finish with new company create your password</i>
          )}
          {confrimCompanyStatus.isVerified && !newPasswordMode && (
            <i>For finish with new company enter your password</i>
          )}
        </p>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          id="password"
          type="password"
          placeholder="Enter password"
          label={"Password "}
          hidden={!confrimCompanyStatus.isVerified}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          id="password2"
          type="password"
          placeholder="Confirm password"
          label={"Password confirm"}
          hidden={!confrimCompanyStatus.isVerified || !newPasswordMode}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p style={{ color: "var(--color-functional-error)" }}>Error: {error}</p>}

        <Button
          disabled={!password}
          variant="contained"
          onClick={singIn}
          sx={{ marginTop: "1rem" }}
        >
          Create Account or sing in
        </Button>
      </Box>
    </>
  );
}
