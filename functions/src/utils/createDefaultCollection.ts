import admin, { db } from "../firebase";

export interface createDefaultUserProps {
  claims: customClaims;
  userInfo: CompanyUserInfo;
}

interface CompanyUserInfo {
  firstName: string;
  lastName: string;
  linkedInUrl: string;
  about: string;
  phone: string;
  email: string;
}

interface customClaims {
  domain: string;
  isAdmin: boolean;
  Owner?: boolean;
}

interface CreateUserWithClaimsProps {
  email: string;
  claims: customClaims;
}

interface CompanyInfo {
  about: string;
  template: string;
  phone: string;
  name: string;
  logoUrl: string;
  email: string;
}

interface createDefaultValueOnDBProps {
  uid: string;
  userInfo: CompanyUserInfo;
  claims: customClaims;
}

export async function createDefaultValueOnDB({
  uid,
  claims,
  userInfo,
}: createDefaultValueOnDBProps) {
  const companyCollection = await db.collection("companies").doc(claims.domain);
  if (claims?.Owner) {
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

async function CreateUserWithClaims({ claims, email }: CreateUserWithClaimsProps) {
  const user = await admin.auth().createUser({
    email,
    emailVerified: false,
    disabled: false,
  });
  await admin.auth().setCustomUserClaims(user.uid, claims);
  return user.uid;
}

export async function createDefaultUser({ claims, userInfo }: createDefaultUserProps) {
  const uid = await CreateUserWithClaims({ claims, email: userInfo.email });
  await createDefaultValueOnDB({ uid, userInfo, claims });
}
