import * as functions from "firebase-functions";
import { initResetUserRequestInDatabase } from "../../dbAdmin/initResetUserRequestInDatabase";
import { createUserInvitation } from "../../dbAdmin/createUserInvitation";
import { isUserInCompany } from "../../dbAdmin/isUserInCompany";
import { isUserInvited } from "../../dbAdmin/isUserInvited";
import { sendInviteUserLink } from "../../email/invite";
import { UserInfo } from "../../../../typescript-types/db.types";
import { DAY } from "../../utils/time";

export interface InviteUserRequest {
  domain: string;
  userInfo: UserInfo;
}

export interface InviteUserResponse {
  result: boolean;
  message: string;
}

export const inviteUser = functions.https.onCall(
  async ({ domain, userInfo }: InviteUserRequest): Promise<InviteUserResponse> => {
    const isRegistered = await isUserInCompany(userInfo.email, domain);
    if (isRegistered) {
      return {
        result: false,
        message: "User already exist in company",
      };
    }
    const isInvited = await isUserInvited(userInfo.email, domain);
    if (isInvited) {
      return {
        result: false,
        message: "User already invited",
      };
    }
    const expiredTimeDiff = 30 * DAY;

    const inviteUserHash = await createUserInvitation({
      domain,
      userInfo,
      expiredTimeDiff,
    });
    const resetPasswordUserHash = await initResetUserRequestInDatabase(
      userInfo.email,
      expiredTimeDiff
    );
    sendInviteUserLink({
      domain,
      email: userInfo.email,
      resetPasswordUserHash,
      inviteUserHash,
    });
    return {
      result: true,
      message: "The invitation is sent",
    };
  }
);
