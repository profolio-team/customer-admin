import * as functions from "firebase-functions";
import { CustomClaims, UserInfo } from "../../../typescript-types/db.types";
import { admin, db } from "../firebase";
import { sendInviteLink } from "../email/invite";

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
  domain: string;
}

export async function setUserInfo({ uid, domain, userInfo }: SetUserInfoProps) {
  const companyCollection = await db.collection("companies").doc(domain);
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

interface CreateUserWithClaimsProps {
  email: string;
  claims: CustomClaims;
}

export async function createUserWithClaims({
  claims,
  email,
}: CreateUserWithClaimsProps): Promise<admin.auth.UserRecord> {
  const user = await admin.auth().createUser({
    email,
    emailVerified: false,
    disabled: false,
  });
  await admin.auth().setCustomUserClaims(user.uid, claims);
  return user;
}

interface InviteUserRequest {
  rootDomainUrl: string;
  fullDomainUrl: string;
  claims: CustomClaims;
  userInfo: UserInfo;
}

interface InviteUserResponce {
  result: string;
  error: string;
  verifyEmailLink: string;
}

export const inviteUser = functions.https.onCall(
  async ({
    rootDomainUrl,
    fullDomainUrl,
    claims,
    userInfo,
  }: InviteUserRequest): Promise<InviteUserResponce> => {
    userInfo = { ...getEmptyUserTemplate(), ...userInfo };

    const user = await createUserWithClaims({ claims, email: userInfo.email });
    await setUserInfo({ uid: user.uid, domain: claims.domain, userInfo });

    const setPasswordUrl = await sendInviteLink({
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
