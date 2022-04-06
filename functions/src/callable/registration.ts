import * as functions from "firebase-functions";
import admin, { db } from "../firebase";
import { sendEmail } from "../utils/email";
import { createDefaultUser } from "../utils/createDefaultCollection";

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

  sendEmail({
    email,
    messageText,
    messageHtml,
    title: "Confirm company",
  });
  return setPasswordUrl;
}

export const registerCompany = functions.https.onCall(
  async ({ email, domain, rootDomainUrl, fullDomainUrl }, context) => {
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
    await createDefaultUser({
      claims: { domain, Owner: true, isAdmin: true },
      userInfo: { email, phone: "", about: "", linkedInUrl: "", lastName: "", firstName: "" },
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
  async ({ rootDomainUrl, fullDomainUrl, claims, userInfo: userInfoFromFront }, context) => {
    // const domain = context.auth?.token.domain;
    const userInfo = {
      email: userInfoFromFront.email,
      phone: userInfoFromFront.phone || "",
      about: userInfoFromFront.firstName || "",
      linkedInUrl: userInfoFromFront.lastName || "",
      lastName: userInfoFromFront.linkedInUrl || "",
      firstName: userInfoFromFront.about || "",
    };
    await createDefaultUser({ claims, userInfo });
    const setPasswordUrl = await sendEmailLink({
      rootDomainUrl,
      email: userInfoFromFront.email,
      fullDomainUrl,
    });
    return {
      result: "ok",
      error: "",
      verifyEmailLink: setPasswordUrl,
    };
  }
);
