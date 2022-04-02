import * as functions from "firebase-functions";
import admin from "../firebase";

export const getDomainByEmail = functions.https.onCall(async ({ email }, context) => {
  try {
    const user = await admin.auth().getUserByEmail(email);

    const domain = user.customClaims?.domain;
    if (domain) {
      return {
        domain: domain,
      };
    } else {
      return {
        error: "User not found",
      };
    }
  } catch (e) {
    return {
      error: "User not found",
    };
  }
});
