import * as functions from "firebase-functions";
import { db } from "../firebase";
import { CompanyInfo, UserInfo } from "../../../typescript-types/db.types";
import { createUserWithClaims, getEmptyUserTemplate, setUserInfo } from "./user";
import { sendInviteLink } from "../email/invite";
import axios from "axios";

// todo: move to config
const RECAPTCHA_KEY_V2_PRIVATE = "6LcWqVofAAAAAIssABPYbmOsBq_vcqOGWijjlgxL";
export const verifyRecaptchaToketByGoogle = async (token: string): Promise<boolean> => {
  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_KEY_V2_PRIVATE}&response=${token}`;
    const request = await axios.post(url);
    const isSuccess = request.data.success === true;
    console.log(request.data);
    return isSuccess;
  } catch (err) {
    return false;
  }
};
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
  recaptchaToken: string;
}

export interface RegisterCompanyResponce {
  result: string;
  error: string;
  verifyEmailLink?: string;
}

export const registerCompany = functions.https.onCall(
  async (
    { email, domain, rootDomainUrl, fullDomainUrl, recaptchaToken }: RegisterCompanyRequest,
    context
  ): Promise<RegisterCompanyResponce> => {
    const emailKey = email.toLowerCase();
    const recaptchaResult = await verifyRecaptchaToketByGoogle(recaptchaToken);
    const isValidApplicationToken = context.app?.token;

    if (!recaptchaResult) {
      return {
        result: "",
        error: "User recaptcha verification failed",
      };
    }

    if (!isValidApplicationToken) {
      return { result: "", error: "Application verification failed" };
    }

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
