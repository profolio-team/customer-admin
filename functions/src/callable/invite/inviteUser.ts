import * as functions from "firebase-functions";
import { UserInfo, UserRoles } from "../../../../typescript-types/db.types";
import { initResetUserRequestInDatabase } from "../../dbAdmin/initResetUserRequestInDatabase";
import { inviteUserInDatabase } from "../../dbAdmin/inviteUserInDatabase";
import { isUserInCompany } from "../../dbAdmin/isUserInCompany";
import { isUserInvited } from "../../dbAdmin/isUserInvited";
import { sendInviteUserLink } from "../../email/invite";

export interface InviteUserRequest {
  domain: string;
  roles: UserRoles;
  userInfo: UserInfo;
}

export interface InviteUserResponse {
  error: string;
}

export const inviteUser = functions.https.onCall(
  async ({ domain, roles, userInfo }: InviteUserRequest): Promise<InviteUserResponse> => {
    const isRegistered = await isUserInCompany(userInfo.email, domain);
    if (isRegistered) {
      return {
        error: `User already exist in company`,
      };
    }

    const isInvited = await isUserInvited(userInfo.email, domain);

    if (isInvited) {
      return {
        error: `User already invited`,
      };
    }

    const inviteUserHash = await inviteUserInDatabase(
      userInfo.email,
      domain,
      roles.isAdmin,
      roles.isOwner
    );
    const resetPasswordUserHash = await initResetUserRequestInDatabase(userInfo.email);

    sendInviteUserLink({
      domain,
      email: userInfo.email,
      resetPasswordUserHash,
      inviteUserHash,
    });

    return {
      error: "",
    };
  }
);
