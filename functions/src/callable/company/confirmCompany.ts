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
        error: "Incorect url hash",
        isVerified: verifyData.isVerified,
      };
    }

    if (verifyData.isVerified) {
      return {
        error: "",
        isVerified: true,
      };
    }

    await createCompanyDatabaseStructure(domain, verifyData);
    return {
      isVerified: true,
      error: "",
    };
  }
);
