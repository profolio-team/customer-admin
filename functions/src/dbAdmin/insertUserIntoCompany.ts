import { AuthCustomClaims, UserInfo, UserRoles } from "../../../typescript-types/db.types";
import { getAuthUser } from "../auth/getAuthUser";
import { admin, db } from "../firebase";

export const insertUserIntoCompany = async (
  email: string,
  domain: string,
  userRoles: UserRoles,
  userInfo: UserInfo
): Promise<void> => {
  let authUserData = await getAuthUser(email);
  if (!authUserData) {
    const authData: admin.auth.CreateRequest = {
      email,
      emailVerified: true,
      disabled: false,
    };
    authUserData = await admin.auth().createUser(authData);
  }

  const uid = authUserData.uid;
  const companyCollection = db.collection("companies").doc(domain);
  await companyCollection.collection("users").doc(uid).set(userInfo);

  await companyCollection.collection("roles").doc(uid).set(userRoles);

  const domains: string[] = authUserData.customClaims?.domains || [];
  if (!domains.includes(domain)) {
    domains.push(domain);
  }

  const userClaims: AuthCustomClaims = {
    domains,
  };

  await admin.auth().setCustomUserClaims(uid, userClaims);
};
