import { ResetUserPassword } from "../../../typescript-types/db.types";
import { db } from "../firebase";

export const getResetPasswordRequestData = async (
  email: string,
  resetPasswordUserHash: string
): Promise<ResetUserPassword | null> => {
  const dbData = await db
    .collection("userResetPassword")
    .where("email", "==", email)
    .where("resetPasswordUserHash", "==", resetPasswordUserHash)
    .get();

  if (dbData.empty) {
    return null;
  }
  return dbData.docs[0].data() as ResetUserPassword;
};
