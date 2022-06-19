import * as functions from "firebase-functions";
import { createCompanyDatabaseStructure } from "../../dbAdmin/createCompanyDatabaseStructure";
import { getCompanyVerificationData } from "../../dbAdmin/getCompanyVerificationData";

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

    const expiredTime = verifyData.expiredAt.toMillis();
    if (Date.now() > expiredTime) {
      return {
        error:
          "Your link for creating space expired. Please, enter your email and domain one more time",
        isVerified: false,
      };
    }

    await createCompanyDatabaseStructure(domain);
    return {
      isVerified: true,
      error: "",
    };
  }
);
