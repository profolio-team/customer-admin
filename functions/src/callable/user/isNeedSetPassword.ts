import * as functions from "firebase-functions";
import { isNeedToResetPassword } from "../../dbAdmin/isNeedToResetPassword";

export interface IsNeedToResetPasswordRequest {
  email: string;
}

export interface IsNeedToResetPasswordResponce {
  error: string;
  isNeedToSetPassword: boolean;
}

export const isNeedSetPassword = functions.https.onCall(
  async ({ email }: IsNeedToResetPasswordRequest): Promise<IsNeedToResetPasswordResponce> => {
    const isNeedToSetPassword = await isNeedToResetPassword(email);

    return {
      error: ``,
      isNeedToSetPassword,
    };
  }
);
