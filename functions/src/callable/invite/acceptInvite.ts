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

    const inviteDoc = await getInviteData({ domain, inviteUserHash });
    if (!inviteDoc) {
      return {
        error: `Email does not invited to this company ${domain}. Or incorrect url`,
        isAccepted: true,
      };
    }

    const expiredTime = inviteDoc.expiredAt.toMillis();
    if (Date.now() > expiredTime) {
      return {
        error: `Your link for invite expired. Please, ask your admin to re-invite`,
        isAccepted: true,
      };
    }

    await insertUserIntoCompany({ email, domain, userInfo: inviteDoc.userInfo });

    return {
      error: "",
      isAccepted: true,
    };
  }
);
