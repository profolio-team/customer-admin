import * as functions from "firebase-functions";
import { CustomClaims, UserInfo } from "../../../typescript-types/db.types";
import { createUserWithClaims, getEmptyUserTemplate, setUserInfo } from "./user";
import { sendInviteLink } from "../email/invite";

interface InviteUserRequest {
  rootDomainUrl: string;
  fullDomainUrl: string;
  claims: CustomClaims;
  userInfo: UserInfo;
}

interface InviteUserResponce {
  result: string;
  error: string;
  verifyEmailLink: string;
}

export const inviteUser = functions.https.onCall(
  async ({
    rootDomainUrl,
    fullDomainUrl,
    claims,
    userInfo,
  }: InviteUserRequest): Promise<InviteUserResponce> => {
    userInfo = { ...getEmptyUserTemplate(), ...userInfo };

    const user = await createUserWithClaims({ claims, email: userInfo.email });
    await setUserInfo({ uid: user.uid, domain: claims.domain, userInfo });

    const setPasswordUrl = await sendInviteLink({
      rootDomainUrl,
      email: userInfo.email,
      fullDomainUrl,
    });

    return {
      result: "ok",
      error: "",
      verifyEmailLink: setPasswordUrl,
    };
  }
);
