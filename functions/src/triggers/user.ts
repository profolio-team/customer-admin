import * as functions from "firebase-functions";
import admin, { db } from "../firebase";

export const handleUserCreate = functions.auth.user().onCreate(async (user, context) => {
  let isAdmin = false;
  let domain = "";

  if (user.email) {
    const data = await db.collection("companyVerification").doc(user.email.toLowerCase()).get();
    const companyVerificationData = data.data();
    domain = companyVerificationData?.domain || "";
    isAdmin = !!companyVerificationData;
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
