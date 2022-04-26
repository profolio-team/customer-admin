import * as functions from "firebase-functions";
import { admin } from "../../firebase";

export interface GetUserDomainByEmailRequest {
  email: string;
}

export interface GetUserDomainByEmailResponse {
  domains: string[];
  error: string;
}

export const getUserDomainByEmail = functions.https.onCall(
  async ({ email }: GetUserDomainByEmailRequest): Promise<GetUserDomainByEmailResponse> => {
    try {
      const user = await admin.auth().getUserByEmail(email);

      const domains = user.customClaims?.domains;
      if (domains) {
        return {
          domains: domains,
          error: "",
        };
      }
      return {
        error: "User not found",
        domains: [],
      };
    } catch (e) {
      return {
        error: "User not found",
        domains: [],
      };
    }
  }
);
