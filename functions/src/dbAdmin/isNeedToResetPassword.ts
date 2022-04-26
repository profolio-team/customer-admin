import { getAuthUser } from "../auth/getAuthUser";

export const isNeedToResetPassword = async (email: string): Promise<boolean> => {
  const authData = await getAuthUser(email);
  if (!authData) {
    return true;
  }

  if (!authData.passwordHash) {
    return true;
  }

  return false;
};
