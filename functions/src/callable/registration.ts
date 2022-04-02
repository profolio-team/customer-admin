import * as functions from "firebase-functions";
import admin, { db } from "../firebase";

/*
import { createTransport } from "nodemailer";
const sendEmail = async (email: string, message: string, title: string) => {
  let transporter = createTransport({
    host: "mailbe05.hoster.by",
    port: 465,
    secure: true,
    auth: {
      user: "postmaster@profolio.email",
      pass: "sGf&kpZhhaPWBd7",
    },
  });

  console.log("Start sending");

  let result = await transporter.sendMail({
    from: '"Node js" <nodejs@example.com>',
    to: email,
    subject: "Message from Node js",
    text: "This message was sent from Node js server.",
    html: "This <i>message</i> was sent from <strong>Node js</strong> server.",
  });

  console.log(result);
};*/

export const confirmCompany = functions.https.onCall(async (data, context) => {
  context.auth?.uid;

  return {
    result: "Confirmed",
  };
});

const generateLinkForSetPassword = async (fullDomainUrl: string, email: string) => {
  const actionCodeSettingsForConfirmCompany = {
    url: `${fullDomainUrl}confirmCompany`,
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
  async ({ email, domain, fullDomainUrl }, context) => {
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

    const setPasswordUrl = await generateLinkForSetPassword(fullDomainUrl, email);

    return {
      result: "ok",
      error: "",
      verifyEmailLink: setPasswordUrl,
    };
  }
);
