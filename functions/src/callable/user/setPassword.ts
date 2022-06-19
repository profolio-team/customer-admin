import * as functions from "firebase-functions";
import { getAuthUser } from "../../auth/getAuthUser";
import { getResetPasswordRequestData } from "../../dbAdmin/getResetPasswordRequestData";
import { setUserNewPassword } from "../../dbAdmin/setUserNewPassword";
import { getDiffInMins } from "../../utils/time";

export interface SetPasswordRequest {
  email: string;
  password: string;
  resetPasswordUserHash: string;
}

export interface SetPasswordResponse {
  error: string;
}

export const setPassword = functions.https.onCall(
  async ({
    email,
    resetPasswordUserHash,
    password,
  }: SetPasswordRequest): Promise<SetPasswordResponse> => {
    const authUserData = await getAuthUser(email);

    if (!authUserData) {
      return {
        error: `User not found`,
      };
    }

    const restDoc = await getResetPasswordRequestData(email, resetPasswordUserHash);
    if (!restDoc) {
      return {
        error: `Incorrect url`,
      };
    }

    const createdAtTime = restDoc.createdAt.toMillis();
    const diffInMins = getDiffInMins(createdAtTime, Date.now());
    if (diffInMins > 10) {
      return {
        error: "Your link for set password expired",
      };
    }

    try {
      await setUserNewPassword(email, password);
    } catch (e) {
      return {
        error: "Unacceptable password. Change password",
      };
    }

    return {
      error: "",
    };
  }
);
