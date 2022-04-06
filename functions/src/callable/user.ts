import * as functions from "firebase-functions";
import { CustomClaims, UserInfo } from "../../../typescript-types/db.types";

import { admin, db } from "../firebase";

export const getEmptyUserTemplate = (): UserInfo => ({
  email: "",
  phone: "",
  about: "",
  linkedInUrl: "",
  lastName: "",
  firstName: "",
});

interface SetUserInfoProps {
  uid: string;
  userInfo: UserInfo;
  claims: CustomClaims;
}

export async function setUserInfo({ uid, claims, userInfo }: SetUserInfoProps) {
  const companyCollection = await db.collection("companies").doc(claims.domain);
  await companyCollection.collection("users").doc(uid).set(userInfo);
}

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
