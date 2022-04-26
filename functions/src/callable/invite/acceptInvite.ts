import * as functions from "firebase-functions";
import { isUserInCompany } from "../../dbAdmin/isUserInCompany";
import { getInviteData } from "../../dbAdmin/getInviteData";
import { insertUserIntoCompany } from "../../dbAdmin/insertUserIntoCompany";
import { UserInfo, UserRoles } from "../../../../typescript-types/db.types";

export interface AcceptInviteRequest {
  email: string;
  inviteUserHash: string;
  domain: string;
}

export interface AcceptInviteResponce {
  error: string;
  isAccepted: boolean;
}

export const acceptInvite = functions.https.onCall(
  async ({ email, inviteUserHash, domain }: AcceptInviteRequest): Promise<AcceptInviteResponce> => {
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

    const userInfo: UserInfo = {
      email: email,
      phone: "",
      about: "",
      linkedInUrl: "",
      lastName: "",
      firstName: "",
    };

    const userRoles: UserRoles = {
      isAdmin: inviteDoc.isAdmin,
      isOwner: inviteDoc.isOwner,
    };
    await insertUserIntoCompany(email, domain, userRoles, userInfo);

    return {
      error: "",
      isAccepted: true,
    };
  }
);
