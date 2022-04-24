import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { toBase64 } from "../../utils/converters";
import {
  AcceptInviteRequest,
  AcceptInviteResponce,
} from "../../../../functions/src/callable/invite/acceptInvite";

import {
  IsNeedToResetPasswordRequest,
  IsNeedToResetPasswordResponce,
} from "../../../../functions/src/callable/user/isNeedSetPassword";

import { functions } from "../../services/firebase";
import { httpsCallable } from "firebase/functions";
import {
  companyName,
  getEmailParamFromUrl,
  getInviteUserHashParamFromUrl,
} from "../../utils/url.utils";
import { Loader } from "../Loader/Loader";
import { SetPassword } from "./SetPassword";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AuthTitle, ErrorInfo } from "./style";

const acceptInvite = httpsCallable<AcceptInviteRequest, AcceptInviteResponce>(
  functions,
  "invite-acceptInvite"
);

const getPasswordStatus = httpsCallable<
  IsNeedToResetPasswordRequest,
  IsNeedToResetPasswordResponce
>(functions, "user-isNeedSetPassword");

export function AcceptInvite({ skipConfirmation }: { skipConfirmation?: boolean }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [isRequiredPasswordChange, setIsRequiredPasswordChange] = useState(false);
  const [isInviteAccepted, setInviteAccepted] = useState(false);
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  const inviteUserHash = getInviteUserHashParamFromUrl();
  const emailFromUrl = getEmailParamFromUrl();

  const [error, setError] = useState("");
  const confirmInvite = async () => {
    if (!companyName) {
      return;
    }

    setLoading(true);
    const acceptInviteReq = await acceptInvite({
      email: emailFromUrl,
      inviteUserHash,
      domain: companyName,
    });
    const acceptResult = acceptInviteReq.data;

    if (acceptResult.error) {
      setError(acceptResult.error);
      return setLoading(false);
    }

    setInviteAccepted(acceptResult.isAccepted);

    if (acceptResult.isAccepted) {
      const passwordStatusReq = await getPasswordStatus({ email: emailFromUrl });

      const { error, isNeedToSetPassword } = passwordStatusReq.data;
      if (error) {
        setError(error);
        return setLoading(false);
      }

      if (isNeedToSetPassword) {
        setIsRequiredPasswordChange(true);
        return setLoading(false);
      }

      if (isAuthorized) {
        return navigate("/");
      } else {
        return navigate("/sign-in/?emailBase64=" + toBase64(emailFromUrl));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (companyName && skipConfirmation) {
      confirmInvite();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (isInviteAccepted && isRequiredPasswordChange) {
    return <SetPassword />;
  }

  return (
    <>
      <AuthTitle>Accept invite</AuthTitle>

      {error && <ErrorInfo>{error}</ErrorInfo>}
      {!companyName && <ErrorInfo>Invalid url (Company name)</ErrorInfo>}

      <p>
        Accept invite from: <b>{companyName}</b>
        <br />
        Your email: {emailFromUrl}
      </p>

      {companyName && (
        <Button variant="contained" onClick={confirmInvite} sx={{ marginTop: "1rem" }}>
          Accept invite
        </Button>
      )}
    </>
  );
}
