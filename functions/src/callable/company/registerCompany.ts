import * as functions from "firebase-functions";
import { sendConfirmCompanyLink } from "../../email/invite";
import { isCompanyRegistered } from "../../dbAdmin/isCompanyRegistered";
import { registerCompanyInDatabase } from "../../dbAdmin/registerCompanyInDatabase";
import { createUserInvitation } from "../../dbAdmin/createUserInvitation";
import { initResetUserRequestInDatabase } from "../../dbAdmin/initResetUserRequestInDatabase";
import { UserInfo } from "../../../../typescript-types/db.types";
import { MINUTE } from "../../utils/time";

export interface RegisterCompanyRequest {
  email: string;
  domain: string;
}

export interface RegisterCompanyResponse {
  error: string;
}

export const registerCompany = functions.https.onCall(
  async ({ email, domain }: RegisterCompanyRequest): Promise<RegisterCompanyResponse> => {
    domain = domain.toLowerCase();

    const isCompanmyAlreadyRegistered = await isCompanyRegistered(domain);
    if (isCompanmyAlreadyRegistered) {
      return {
        error: "Domain already registered",
      };
    }
    const expiredTimeDiff = 10 * MINUTE;
    const confirmCompanyHash = await registerCompanyInDatabase(domain, expiredTimeDiff);
    const userInfo: UserInfo = {
      email,
      role: "admin",
      grade: "",
      job: "",
      firstName: "Admin",
      lastName: "Admin",
      isActive: true,
      location: "",
      about: "",
      linkedInUrl: "",
      phone: "",
    };
    const inviteUserHash = await createUserInvitation({ domain, userInfo, expiredTimeDiff });
    const resetPasswordUserHash = await initResetUserRequestInDatabase(email, expiredTimeDiff);

    sendConfirmCompanyLink({
      domain,
      email,
      confirmCompanyHash,
      inviteUserHash,
      resetPasswordUserHash,
    });

    return {
      error: "",
    };
  }
);
