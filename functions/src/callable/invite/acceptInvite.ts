import * as functions from "firebase-functions";
import { isUserInCompany } from "../../dbAdmin/isUserInCompany";
import { getInviteData } from "../../dbAdmin/getInviteData";
import { insertUserIntoCompany } from "../../dbAdmin/insertUserIntoCompany";
import { getDiffInDays } from "../../utils/time";

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

    const createdAtTime = inviteDoc.createdAt.toMillis();
    const diffInDays = getDiffInDays(createdAtTime, Date.now());
    if (diffInDays > 30) {
      return {
        error: `Your link for invite expired after 30 days. Please, ask your admin to re-invite`,
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
