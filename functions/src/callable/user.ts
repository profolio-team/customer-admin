import * as functions from "firebase-functions";
import { CorporateUserInfo, CustomClaims, fullUserInfo } from "../../../typescript-types/db.types";
import { admin, db } from "../firebase";
import { sendInviteLink } from "../email/invite";

export const getEmptyUserTemplate = (): fullUserInfo => ({
  email: "",
  phone: "",
  about: "",
  linkedInUrl: "",
  lastName: "",
  firstName: "",
  role: "",
  project: "",
  grade: "",
  job: "",
  location: "",
  departmentID: "",
  isActive: false,
});

interface SetUserInfoProps {
  uid: string;
  userInfo: fullUserInfo;
  domain: string;
}

export async function setUserInfo({ uid, domain, userInfo }: SetUserInfoProps): Promise<void> {
  const companyCollection = db.collection("companies").doc(domain);
  await companyCollection.collection("users").doc(uid).set(userInfo);
}

export interface GetUserDomainByEmailRequest {
  email: string;
}

export interface GetUserDomainByEmailResponse {
  domain?: string;
  error?: string;
}

export const getUserDomainByEmail = functions.https.onCall(
  async ({ email }: GetUserDomainByEmailRequest): Promise<GetUserDomainByEmailResponse> => {
    try {
      console.log("email", email);
      const user = await admin.auth().getUserByEmail(email);
      console.log("user", user);

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
  }
);

interface CreateUserWithClaimsProps {
  email: string;
  claims: CustomClaims;
  password?: string;
}

export async function createUserWithClaims({
  claims,
  email,
  password,
}: CreateUserWithClaimsProps): Promise<admin.auth.UserRecord> {
  const authData: admin.auth.CreateRequest = {
    email,
    emailVerified: false,
    disabled: false,
  };

  if (password) {
    authData.password = password;
  }
  const user = await admin.auth().createUser(authData);
  await admin.auth().setCustomUserClaims(user.uid, claims);
  return user;
}

export interface InviteUserRequest {
  rootDomainUrl: string;
  fullDomainUrl: string;
  claims: CustomClaims;
  userInfoInvite: CorporateUserInfo;
}

export interface InviteUserResponse {
  result: string;
  error: string;
  verifyEmailLink: string;
}

export const inviteUser = functions.https.onCall(
  async ({
    rootDomainUrl,
    fullDomainUrl,
    claims,
    userInfoInvite,
  }: InviteUserRequest): Promise<InviteUserResponse> => {
    const userInfo: fullUserInfo = { ...getEmptyUserTemplate(), ...userInfoInvite };

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
