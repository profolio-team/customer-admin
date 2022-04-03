import * as functions from "firebase-functions";
import admin, { db } from "../firebase";
import { sendEmail } from "../utils/email";

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

    try {
      await admin.auth().createUser({
        email,
        emailVerified: false,
        disabled: false,
      });
    } catch (e) {
      console.log("Failed of creation user");
      console.log(e);

      return {
        result: "",
        error: "Failed of creation user",
      };
    }

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

    return {
      result: "ok",
      error: "",
      verifyEmailLink: setPasswordUrl,
    };
  }
);
