import * as functions from "firebase-functions";
import { sendResetPasswordUserLink } from "../../email/invite";
import { getAuthUser } from "../../auth/getAuthUser";
import { initResetUserRequestInDatabase } from "../../dbAdmin/initResetUserRequestInDatabase";

export interface ResetPasswordRequest {
  email: string;
}
export interface ResetPasswordResponse {
  error: string;
}

export const resetPassword = functions.https.onCall(
  async ({ email }: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    const authUserData = await getAuthUser(email);
    if (!authUserData) {
      return {
        error: "User Not Found",
      };
    }
    const resetPasswordUserHash = await initResetUserRequestInDatabase(email);

    sendResetPasswordUserLink({
      email,
      resetPasswordUserHash,
    });

    return {
      error: "",
    };
  }
);
