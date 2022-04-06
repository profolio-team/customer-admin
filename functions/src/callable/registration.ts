import * as functions from "firebase-functions";
import admin, { db } from "../firebase";
import { sendEmail } from "../email/sendEmail";
import { CompanyInfo, CustomClaims, UserInfo } from "../../../typescript-types/db.types";
import { getEmptyUserTemplate, setUserInfo } from "./user";
import { getEmptyCompanyTemplate, setCompanyInfo } from "./company";

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

interface sendEmailLinkProps {
  rootDomainUrl: string;
  email: string;
  fullDomainUrl: string;
}

export const confirmCompany = functions.https.onCall(async (data, context) => {
  context.auth?.uid;

  return {
    result: "Confirmed",
  };
});

const generateLinkForSetPassword = async (
  rootDomainUrl: string,
  email: string,
  fullDomainUrl: string
) => {
  const urlForSignIn = `${fullDomainUrl}sign-in?email=${email}`;
  const actionCodeSettingsForConfirmCompany = {
    url: `${rootDomainUrl}redirect?to=${urlForSignIn}`,
  };

  const setPasswordUrl = await admin
    .auth()
    .generatePasswordResetLink(email, actionCodeSettingsForConfirmCompany);

  const actionCodeSettingsForRestPassword = {
    url: `${setPasswordUrl}&newPassword=123123`,
  };

  const verificationLink = await admin
    .auth()
    .generateEmailVerificationLink(email, actionCodeSettingsForRestPassword);

  return verificationLink;
};

async function sendEmailLink({ rootDomainUrl, email, fullDomainUrl }: sendEmailLinkProps) {
  const setPasswordUrl = await generateLinkForSetPassword(rootDomainUrl, email, fullDomainUrl);
  const messageText = `Your link -> ${setPasswordUrl} (Plain text)`;
  const messageHtml = `
      Your link -> 
      <a href="${setPasswordUrl}">Link for confirm and set password</a>
    `;
  await sendEmail({
    email,
    messageText,
    messageHtml,
    title: "Confirm company",
  });
  return setPasswordUrl;
}

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

    const setPasswordUrl = await sendEmailLink({ rootDomainUrl, email, fullDomainUrl });

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
    const setPasswordUrl = await sendEmailLink({
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
