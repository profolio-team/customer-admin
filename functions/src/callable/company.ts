import * as functions from "firebase-functions";
import { db } from "../firebase";
import { CompanyInfo, UserInfo } from "../../../typescript-types/db.types";
import { createUserWithClaims, getEmptyUserTemplate, setUserInfo } from "./user";
import { sendInviteLink } from "../email/invite";

const getEmptyCompanyTemplate = (): CompanyInfo => ({
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
}
async function setCompanyInfo({ domain, companyInfo }: SetCompanyInfoProps) {
  const companyCollection = await db.collection("companies").doc(domain);
  await companyCollection.collection("config").doc("companyInfo").set(companyInfo);
}

export interface RegisterCompanyRequest {
  email: string;
  domain: string;
  rootDomainUrl: string;
  fullDomainUrl: string;
}

export interface RegisterCompanyResponce {
  result: string;
  error: string;
  verifyEmailLink?: string;
}

export const registerCompany = functions.https.onCall(
  async ({
    email,
    domain,
    rootDomainUrl,
    fullDomainUrl,
  }: RegisterCompanyRequest): Promise<RegisterCompanyResponce> => {
    const emailKey = email.toLowerCase();
    const getVerificationDBResult = await db.collection("companyVerification").doc(emailKey).get();
    if (getVerificationDBResult.data()) {
      return {
        result: "",
        error: "User already registered",
      };
    }
    await db.collection("companyVerification").doc(emailKey).set({
      domain: domain,
      isVerified: false,
    });

    const userInfo: UserInfo = { ...getEmptyUserTemplate(), email };
    const claims = { domain, isOwner: true, isAdmin: true };

    const user = await createUserWithClaims({ claims, email });
    await setUserInfo({ uid: user.uid, domain, userInfo });

    const companyInfo: CompanyInfo = {
      ...getEmptyCompanyTemplate(),
      email: email,
    };
    await setCompanyInfo({ domain, companyInfo });

    const setPasswordUrl = await sendInviteLink({ rootDomainUrl, email, fullDomainUrl });
    return {
      result: "ok",
      error: "",
      verifyEmailLink: setPasswordUrl,
    };
  }
);
