import * as functions from "firebase-functions";
import { isUserInCompany } from "../../dbAdmin/isUserInCompany";
import { getInviteData } from "../../dbAdmin/getInviteData";
import { insertUserIntoCompany } from "../../dbAdmin/insertUserIntoCompany";

export interface AcceptInviteRequest {
  email: string;
  inviteUserHash: string;
  domain: string;
}

export interface AcceptInviteResponse {
  error: string;
  isAccepted: boolean;
}

export const acceptInvite = functions.https.onCall(
  async ({ email, inviteUserHash, domain }: AcceptInviteRequest): Promise<AcceptInviteResponse> => {
    const isRegistered = await isUserInCompany(email, domain);

    if (isRegistered) {
      return {
        error: ``,
        isAccepted: true,
      };
    }

    const inviteDoc = await getInviteData(email, domain, inviteUserHash);
    if (!inviteDoc) {
      return {
        error: `Email does not invited to this company ${domain}. Or incorect url`,
        isAccepted: true,
      };
    }

    await insertUserIntoCompany(email, domain, inviteDoc.userInfo);

    return {
      error: "",
      isAccepted: true,
    };
  }
);
