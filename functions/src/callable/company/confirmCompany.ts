import * as functions from "firebase-functions";
import { createCompanyDatabaseStructure } from "../../dbAdmin/createCompanyDatabaseStructure";
import { getCompanyVerificationData } from "../../dbAdmin/getCompanyVerificationData";
import firebase from "../../firebase";
const { FieldValue } = firebase.firestore;
import { Timestamp } from "@firebase/firestore-types";
import { getDiffInMins } from "../../utils/time";

export interface ConfirmCompanyRequest {
  domain: string;
  confirmCompanyHash: string;
}

export interface ConfirmCompanyResponse {
  error: string;
  isVerified: boolean;
}

export const confirmCompany = functions.https.onCall(
  async ({
    domain,
    confirmCompanyHash,
  }: ConfirmCompanyRequest): Promise<ConfirmCompanyResponse> => {
    domain = domain.toLowerCase();
    const verifyData = await getCompanyVerificationData(domain);

    if (!verifyData) {
      return {
        error: "Company unknown",
        isVerified: false,
      };
    }

    if (verifyData.confirmCompanyHash !== confirmCompanyHash) {
      return {
        error: "Incorrect url hash",
        isVerified: verifyData.isVerified,
      };
    }

    if (verifyData.isVerified) {
      return {
        error: "Company already registered",
        isVerified: true,
      };
    }

    const registerCompanyTime = verifyData.createdAt.toMillis();
    const diffInMins = getDiffInMins(registerCompanyTime, Date.now());
    if (diffInMins > 10) {
      return {
        error:
          "Your link for creating space expired after 10 minutes. Please, enter your email and domain one more time",
        isVerified: false,
      };
    }

    await createCompanyDatabaseStructure(domain, verifyData);
    return {
      isVerified: true,
      error: "",
    };
  }
);
