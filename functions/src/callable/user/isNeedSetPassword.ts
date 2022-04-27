import * as functions from "firebase-functions";
import { isNeedToResetPassword } from "../../dbAdmin/isNeedToResetPassword";

export interface IsNeedToResetPasswordRequest {
  email: string;
}

export interface IsNeedToResetPasswordResponse {
  error: string;
  isNeedToSetPassword: boolean;
}

export const isNeedSetPassword = functions.https.onCall(
  async ({ email }: IsNeedToResetPasswordRequest): Promise<IsNeedToResetPasswordResponse> => {
    const isNeedToSetPassword = await isNeedToResetPassword(email);

    return {
      error: ``,
      isNeedToSetPassword,
    };
  }
);
