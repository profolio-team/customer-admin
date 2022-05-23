import * as functions from "firebase-functions";
import { sendConfirmCompanyLink } from "../../email/invite";
import { isCompanyRegistered } from "../../dbAdmin/isCompanyRegistered";
import { registerCompanyInDatabase } from "../../dbAdmin/registerCompanyInDatabase";
import { createUserInvitation } from "../../dbAdmin/createUserInvitation";
import { initResetUserRequestInDatabase } from "../../dbAdmin/initResetUserRequestInDatabase";
import { AdminUserInfo } from "../../../../typescript-types/db.types";

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

    const confirmCompanyHash = await registerCompanyInDatabase(domain);
    const userInfo: AdminUserInfo = {
      email,
      role: "admin",
      grade: "",
      job: "",
      firstName: "Admin",
      lastName: "Admin",
      isActive: true,
      location: "",
      project: "",
    };
    const inviteUserHash = await createUserInvitation({ domain, userInfo });
    const resetPasswordUserHash = await initResetUserRequestInDatabase(email);

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
