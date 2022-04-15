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

const getUserInviteStatus = httpsCallable<InviteStatusRequest, InviteStatusResponce>(
  functions,
  "user-getInviteStatus"
);

const acceptInvite = httpsCallable<AcceptInviteRequest, AcceptInviteResponce>(
  functions,
  "user-acceptInvite"
);

export function InviteUserForm(): JSX.Element {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordMode, createNewPasswordMode] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [signInWithEmailAndPassword, , , errorLogin] = useSignInWithEmailAndPassword(auth);

  const urlParams = new URLSearchParams(window.location.search);
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
      const needToCreatePassword = await isNewUser();
      createNewPasswordMode(needToCreatePassword);
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

      {errorLogin && (
        <p style={{ color: "var(--color-functional-error)" }}>errorLogin: {errorLogin}</p>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          id="password"
          type="password"
          placeholder="Enter password"
          label={"Password "}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          id="password2"
          type="password"
          placeholder="Confirm password"
          label={"Password confirm"}
          hidden={!newPasswordMode}
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
