import * as functions from "firebase-functions";
import admin, { db } from "../firebase";
import { CompanyInfo, CustomClaims, UserInfo } from "../../../typescript-types/db.types";
import { getEmptyUserTemplate, setUserInfo } from "./user";
import { getEmptyCompanyTemplate, setCompanyInfo } from "./company";
import { sendInviteLink } from "../email/invite";

export interface createDefaultUserProps {
  claims: CustomClaims;
  userInfo: UserInfo;
}

interface CreateUserWithClaimsProps {
  email: string;
  claims: CustomClaims;
}

async function createUserWithClaims({ claims, email }: CreateUserWithClaimsProps) {
  const user = await admin.auth().createUser({
    email,
    emailVerified: false,
    disabled: false,
  });
  await admin.auth().setCustomUserClaims(user.uid, claims);
  return user.uid;
}

export async function createDefaultUser({ claims, userInfo }: createDefaultUserProps) {
  const uid = await createUserWithClaims({ claims, email: userInfo.email });
  setUserInfo({ uid, claims, userInfo });
}

export const confirmCompany = functions.https.onCall(async (data, context) => {
  context.auth?.uid;

  return {
    result: "Confirmed",
  };
});

export const registerCompany = functions.https.onCall(
  async ({ email, domain, rootDomainUrl, fullDomainUrl }) => {
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
    const defaultUserInfo: UserInfo = { ...getEmptyUserTemplate(), email };

    const userClaims = { domain, isOwner: true, isAdmin: true };
    await createDefaultUser({
      claims: userClaims,
      userInfo: defaultUserInfo,
    });

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
    const defaultUserInfo: UserInfo = { ...getEmptyUserTemplate(), ...userInfo };

    await createDefaultUser({ claims, userInfo: defaultUserInfo });
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
