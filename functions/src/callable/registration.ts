import * as functions from "firebase-functions";
import admin, { db } from "../firebase";

export const registerCompany = functions.https.onCall(async ({ email, domain }, context) => {
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
      email: email,
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

  return {
    result: "ok",
    error: "",
  };
});
