import { UserInfo } from "../../../typescript-types/db.types";
import { AuthCustomClaims } from "../../../typescript-types/auth.types";
import { getAuthUser } from "../auth/getAuthUser";
import { admin, db } from "../firebase";

interface insertUserIntoCompanyProps {
  email: string;
  domain: string;
  userInfo: UserInfo;
}

export const insertUserIntoCompany = async ({
  email,
  domain,
  userInfo,
}: insertUserIntoCompanyProps): Promise<void> => {
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

  const domains: string[] = authUserData.customClaims?.domains || [];
  if (!domains.includes(domain)) {
    domains.push(domain);
  }

  const userClaims: AuthCustomClaims = {
    domains,
  };

  await admin.auth().setCustomUserClaims(uid, userClaims);
};
