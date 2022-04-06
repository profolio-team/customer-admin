import * as functions from "firebase-functions";
import { admin } from "../firebase";

export const getUserDomainByEmail = functions.https.onCall(async ({ email }) => {
  try {
    const user = await admin.auth().getUserByEmail(email);

    const domain = user.customClaims?.domain;
    if (domain) {
      return {
        domain: domain,
      };
    } else {
      return {
        error: "domain in custom claim not found",
      };
    }
  } catch (e) {
    return {
      error: "Error on getting info from Auth" + JSON.stringify(e),
    };
  }
});
