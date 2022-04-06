import * as functions from "firebase-functions";
import { db } from "../firebase";
import { CompanyInfo, CustomClaims, UserInfo } from "../../../typescript-types/db.types";
import { createUserWithClaims, getEmptyUserTemplate, setUserInfo } from "./user";
import { getEmptyCompanyTemplate, setCompanyInfo } from "./company";
import { sendInviteLink } from "../email/invite";

export interface RegisterCompanyRequest {
  email: string;
  domain: string;
  rootDomainUrl: string;
  fullDomainUrl: string;
}

export interface RegisterCompanyResponce {
  result: string;
  error: string;
  verifyEmailLink?: string;
}

export const registerCompany = functions.https.onCall(
  async ({
    email,
    domain,
    rootDomainUrl,
    fullDomainUrl,
  }: RegisterCompanyRequest): Promise<RegisterCompanyResponce> => {
    const emailKey = email.toLowerCase();
    const getVerificationDBResult = await db.collection("companyVerification").doc(emailKey).get();
    if (getVerificationDBResult.data()) {
      return {
        result: "",
        error: "User already registered",
      };
    }
    await db.collection("companyVerification").doc(emailKey).set({
      domain: domain,
      isVerified: false,
    });

    const userInfo: UserInfo = { ...getEmptyUserTemplate(), email };
    const claims = { domain, isOwner: true, isAdmin: true };

    const user = await createUserWithClaims({ claims, email });
    await setUserInfo({ uid: user.uid, domain, userInfo });

    const companyInfo: CompanyInfo = {
      ...getEmptyCompanyTemplate(),
      email: email,
    };
    await setCompanyInfo({ domain, companyInfo });

    const setPasswordUrl = await sendInviteLink({ rootDomainUrl, email, fullDomainUrl });
    return {
      result: "ok",
      error: "",
      verifyEmailLink: setPasswordUrl,
    };
  }
);

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
