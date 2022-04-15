import { FieldValue, Timestamp } from "@firebase/firestore-types";
import * as functions from "firebase-functions";
import { UserInfo, UserInvite, UserRoles } from "../../../typescript-types/db.types";
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
  domain: string;
}

export async function setUserInfo({ uid, domain, userInfo }: SetUserInfoProps): Promise<void> {
  const companyCollection = db.collection("companies").doc(domain);
  await companyCollection.collection("users").doc(uid).set(userInfo);
}

export interface GetUserDomainByEmailRequest {
  email: string;
}

export interface GetUserDomainByEmailResponce {
  domains?: string[];
  error?: string;
}

export const getUserDomainByEmail = functions.https.onCall(
  async ({ email }: GetUserDomainByEmailRequest): Promise<GetUserDomainByEmailResponce> => {
    try {
      console.log("email", email);
      const user = await admin.auth().getUserByEmail(email);
      console.log("user", user);

      const domains = user.customClaims?.domains;
      if (domains) {
        return {
          domains: domains,
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

export interface InviteUserRequest {
  domain: string;
  roles: UserRoles;
  userInfo: UserInfo;
}

export interface InviteUserResponce {
  result: string;
  error: string;
}

export const inviteUser = functions.https.onCall(
  async ({ domain, roles, userInfo }: InviteUserRequest): Promise<InviteUserResponce> => {
    console.log(domain, roles, userInfo);
    const date = FieldValue.serverTimestamp() as Timestamp;
    const confirmUserHash = `${Date.now()}userHast`;
    const userInviteData: UserInvite = {
      isAdmin: roles.isAdmin,
      isOwner: roles.isOwner,
      confirmUserHash,
      email: userInfo.email,
      domain: domain,
      createdAt: date,
    };
    await db.collection("userInvite").add(userInviteData);

    sendInviteUserLink({
      domain,
      email: userInfo.email,
      confirmUserHash,
    });

    return {
      result: "ok",
      error: "",
    };
  }
);

async function isUserExist(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    admin
      .auth()
      .getUserByEmail(email)
      .then((user) => {
        resolve(true);
      })
      .catch((err) => {
        resolve(false);
      });
  });
}

export interface InviteStatusRequest {
  email: string;
  confirmUserHash: string;
  domain: string;
}

export interface InviteStatusResponce {
  isNewUser?: boolean;
  error?: string;
}

export const getInviteStatus = functions.https.onCall(
  async ({
    email,
    confirmUserHash,
    domain,
  }: InviteStatusRequest): Promise<InviteStatusResponce> => {
    const inviteData = await db
      .collection("userInvite")
      .where("email", "==", email)
      .where("domain", "==", domain)
      .where("confirmUserHash", "==", confirmUserHash)
      .get();

    if (inviteData.empty) {
      return {
        error: `Email does not invited to this company ${domain}. Or incorect url`,
      };
    }

    const isUserExistInFirebase = await isUserExist(email);
    console.log("getInviteStatus isUserExistInFirebase", isUserExistInFirebase);

    return {
      isNewUser: !isUserExistInFirebase,
    };
  }
);

export interface AcceptInviteRequest {
  email: string;
  confirmUserHash: string;
  domain: string;
  password?: string;
}

export interface AcceptInviteResponce {
  result?: string;
  error?: string;
}

export const acceptInvite = functions.https.onCall(
  async ({
    email,
    confirmUserHash,
    domain,
    password,
  }: AcceptInviteRequest): Promise<AcceptInviteResponce> => {
    const dbInviteData = await db
      .collection("userInvite")
      .where("email", "==", email)
      .where("domain", "==", domain)
      .where("confirmUserHash", "==", confirmUserHash)
      .get();

    if (dbInviteData.empty) {
      return {
        error: `Email does not invited to this company ${domain}. Or incorect url`,
      };
    }
    const inviteDoc = dbInviteData.docs[0].data() as UserInvite;
    const isUserExistInFirebase = await isUserExist(email);
    const userInfo = { ...getEmptyUserTemplate() };

    userInfo.email = email;

    let authUserData: admin.auth.UserRecord;
    if (!isUserExistInFirebase) {
      const authData: admin.auth.CreateRequest = {
        email,
        emailVerified: true,
        disabled: false,
        password: password,
      };
      authUserData = await admin.auth().createUser(authData);
    } else {
      authUserData = await admin.auth().getUserByEmail(email);
    }

    const uid = authUserData.uid;
    const companyCollection = db.collection("companies").doc(domain);
    await companyCollection.collection("users").doc(uid).set(userInfo);

    const userRoles: UserRoles = {
      isAdmin: inviteDoc.isAdmin,
      isOwner: inviteDoc.isOwner,
    };
    await companyCollection.collection("roles").doc(uid).set(userRoles);

    const domains: string[] = authUserData.customClaims?.domains || [];
    if (!domain.includes(domain)) {
      domains.push(domain);
    }

    await admin.auth().setCustomUserClaims(uid, { domains });

    const userInviteDocId = dbInviteData.docs[0].id;
    await db.collection("userInvite").doc(userInviteDocId).delete();

    return {
      error: "",
    };
  }
);
