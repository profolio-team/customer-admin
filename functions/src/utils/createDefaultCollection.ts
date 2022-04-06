import { admin, db } from "../firebase";
import { CompanyInfo, CustomClaims, UserInfo } from "../../../typescript-types/db.types";

export interface createDefaultUserProps {
  claims: CustomClaims;
  userInfo: UserInfo;
}

interface CreateUserWithClaimsProps {
  email: string;
  claims: CustomClaims;
}

interface createDefaultValueOnDBProps {
  uid: string;
  userInfo: UserInfo;
  claims: CustomClaims;
}

export async function createDefaultValueOnDB({
  uid,
  claims,
  userInfo,
}: createDefaultValueOnDBProps) {
  const companyCollection = await db.collection("companies").doc(claims.domain);
  if (claims?.isOwner) {
    const companyInfo: CompanyInfo = {
      name: "",
      about: "",
      phone: "",
      logoUrl: "",
      template: "",
      email: userInfo.email,
    };
    await companyCollection.collection("config").doc("companyInfo").set(companyInfo);
  }
  await companyCollection.collection("users").doc(uid).set(userInfo);
}

async function createUserWithClaims({ claims, email }: CreateUserWithClaimsProps) {
  const user = await admin.auth().createUser({
    email,
    emailVerified: false,
    disabled: false,
  });
  await admin.auth().setCustomUserClaims(user.uid, claims);
  return user.uid;
}

export async function createDefaultUser({ claims, userInfo }: createDefaultUserProps) {
  const uid = await createUserWithClaims({ claims, email: userInfo.email });
  await createDefaultValueOnDB({ uid, userInfo, claims });
}
