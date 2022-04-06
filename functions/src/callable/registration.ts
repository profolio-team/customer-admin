import * as functions from "firebase-functions";
import admin, { db } from "../firebase";
import { sendEmail } from "../email/sendEmail";
import { CompanyInfo, CustomClaims, UserInfo } from "../../../typescript-types/db.types";

export interface createDefaultUserProps {
  claims: CustomClaims;
  userInfo: UserInfo;
}

interface CreateUserWithClaimsProps {
  email: string;
  claims: CustomClaims;
}

interface createDefaultValueOnDBProps {
  uid: string;
  userInfo: UserInfo;
  claims: CustomClaims;
}

export async function createDefaultValueOnDB({
  uid,
  claims,
  userInfo,
}: createDefaultValueOnDBProps) {
  const companyCollection = await db.collection("companies").doc(claims.domain);
  if (claims?.isOwner) {
    const companyInfo: CompanyInfo = {
      name: "",
      about: "",
      phone: "",
      logoUrl: "",
      template: "",
      email: userInfo.email,
    };
    await companyCollection.collection("config").doc("companyInfo").set(companyInfo);
  }
  await companyCollection.collection("users").doc(uid).set(userInfo);
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
  await createDefaultValueOnDB({ uid, userInfo, claims });
}

interface userInfoFromFront {
  firstName?: string;
  lastName?: string;
  linkedInUrl?: string;
  about?: string;
  phone?: string;
  email: string;
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

function createDefaultUserInfo(info: userInfoFromFront): UserInfo {
  return {
    email: info.email,
    phone: info.phone || "",
    about: info.about || "",
    linkedInUrl: info.linkedInUrl || "",
    lastName: info.lastName || "",
    firstName: info.firstName || "",
  };
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
    const defaultUserInfo = createDefaultUserInfo({ email });
    await createDefaultUser({
      claims: { domain, isOwner: true, isAdmin: true },
      userInfo: defaultUserInfo,
    });
    const setPasswordUrl = await sendEmailLink({ rootDomainUrl, email, fullDomainUrl });

    return {
      result: "ok",
      error: "",
      verifyEmailLink: setPasswordUrl,
    };
  }
);
export const inviteUser = functions.https.onCall(
  async ({ rootDomainUrl, fullDomainUrl, claims, userInfo }) => {
    const defaultUserInfo = createDefaultUserInfo(userInfo);
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
