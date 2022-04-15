import * as functions from "firebase-functions";
import firebase, { db } from "../firebase";
import { CompanyInfo, CompanyVerification, UserInvite } from "../../../typescript-types/db.types";
import { sendConfirmCompanyLink } from "../email/invite";
import { Timestamp } from "@firebase/firestore-types";
const { FieldValue } = firebase.firestore;

export const getEmptyCompanyTemplate = (): CompanyInfo => ({
  name: "",
  about: "",
  phone: "",
  logoUrl: "",
  template: "",
  email: "",
});

interface SetCompanyInfoProps {
  domain: string;
  companyInfo: CompanyInfo;
  isVeified: boolean;
}

export async function setCompanyInfo({
  domain,
  companyInfo,
  isVeified,
}: SetCompanyInfoProps): Promise<void> {
  const companyCollection = db.collection("companies").doc(domain);

  companyCollection.set({
    isVeified,
  });

  await companyCollection.collection("config").doc("companyInfo").set(companyInfo, { merge: true });
}

export interface ConfirmCompanyRequest {
  domain: string;
  confirmCompanyHash: string;
}

export interface ConfirmCompanyResponce {
  isVerified?: boolean;
  error?: string;
}

/*
    // const userInfo: UserInfo = { ...getEmptyUserTemplate(), email: verifyData.email };
    // const claims = { domain, isOwner: true, isAdmin: true };
    // const user = await createUserWithClaims({ claims, email, password, isEmailVerified: true });
    // await setUserInfo({ uid: user.uid, domain, userInfo });
*/

export const confirmCompany = functions.https.onCall(
  async (
    { domain, confirmCompanyHash }: ConfirmCompanyRequest,
    context
  ): Promise<ConfirmCompanyResponce> => {
    domain = domain.toLowerCase();
    const getVerificationDBResult = await db.collection("companyVerification").doc(domain).get();
    const verifyData = getVerificationDBResult.data() as CompanyVerification;
    const date = FieldValue.serverTimestamp() as Timestamp;
    console.log(verifyData, date);

    if (!verifyData) {
      return {
        error: "Company unknown",
      };
    }
    if (verifyData.confirmCompanyHash !== confirmCompanyHash) {
      return {
        error: "Incorect url hash",
      };
    }

    if (verifyData.isVerified) {
      return {
        isVerified: true,
      };
    }

    const updatedVerificationInfo: CompanyVerification = {
      ...verifyData,
      isVerified: true,
    };
    await db
      .collection("companyVerification")
      .doc(domain)
      .set(updatedVerificationInfo, { merge: true });

    const companyInfo: CompanyInfo = {
      ...getEmptyCompanyTemplate(),
    };
    await setCompanyInfo({ domain, companyInfo, isVeified: true });

    return {
      isVerified: true,
    };
  }
);

export interface RegisterCompanyRequest {
  email: string;
  domain: string;
  rootDomainUrl: string;
  fullDomainUrl: string;
}
export interface RegisterCompanyResponce {
  result: string;
  error: string;
}

export const registerCompany = functions.https.onCall(
  async ({ email, domain }: RegisterCompanyRequest, context): Promise<RegisterCompanyResponce> => {
    domain = domain.toLowerCase();

    const verifyByDomain = await db.collection("companyVerification").doc(domain).get();
    const verifyByDomainData = verifyByDomain.data() as CompanyVerification;
    const readyForSignUpDomain = !verifyByDomainData || !verifyByDomainData.isVerified;
    if (!readyForSignUpDomain) {
      return {
        result: "",
        error: "Domain already registered",
      };
    }

    const date = FieldValue.serverTimestamp() as Timestamp;
    console.log("date registerCompany", date);

    const confirmCompanyHash = `${Date.now()}haComapnyshex`;
    const verificationData: CompanyVerification = {
      confirmCompanyHash: confirmCompanyHash,
      createdAt: date,
      isVerified: false,
    };
    await db.collection("companyVerification").doc(domain).set(verificationData);

    const confirmUserHash = `${Date.now()}haUSERhex`;

    const userInviteData: UserInvite = {
      isAdmin: true,
      isOwner: true,
      confirmUserHash,
      email: email,
      domain: domain,
      createdAt: date,
    };
    await db.collection("userInvite").add(userInviteData);

    sendConfirmCompanyLink({
      domain,
      email,
      confirmCompanyHash: confirmCompanyHash,
      confirmUserHash,
    });

    return {
      result: "ok",
      error: "",
    };
  }
);
