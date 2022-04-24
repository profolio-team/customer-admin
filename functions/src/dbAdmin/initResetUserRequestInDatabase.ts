import { ResetUserPassword } from "../../../typescript-types/db.types";
import { db } from "../firebase";
import { generateUniqHash } from "../utils/hash";

export const initResetUserRequestInDatabase = async (email: string): Promise<string> => {
  const resetPasswordUserHash = await generateUniqHash();
  const resetPasswordData: ResetUserPassword = {
    email,
    resetPasswordUserHash,
  };

  await db.collection("userResetPassword").add(resetPasswordData);
  return resetPasswordUserHash;
};
