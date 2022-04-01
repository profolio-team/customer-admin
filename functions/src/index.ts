import * as functions from "firebase-functions";
import admin, { db } from "./firebase";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Hello logs!2", { structuredData: true });

  await db.collection("firstcollection").doc("doooc").set({
    aaaa: "bbbbb",
  });
  response.send("Hello from Firebase!");
});

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

export const handleUserCreate = functions.auth.user().onCreate(async (user, context) => {
  let isAdmin = false;
  let domain = "";

  if (user.email) {
    const data = await db.collection("companyVerification").doc(user.email.toLowerCase()).get();
    const companyVerificationData = data.data();
    domain = companyVerificationData?.domain || "";
    isAdmin = !!companyVerificationData;

    const verificationLink = await admin.auth().generateEmailVerificationLink(user.email);
    functions.logger.log(verificationLink);
  }

  if (domain) {
    const companyCollection = db.collection("companies").doc(domain);
    companyCollection.collection("users").doc(user.uid).create({});
  }

  await admin.auth().setCustomUserClaims(user.uid, {
    domain,
    isAdmin,
  });
});
