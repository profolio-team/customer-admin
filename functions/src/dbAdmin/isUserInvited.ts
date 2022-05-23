import { db } from "../firebase";

export const isUserInvited = async (email: string, domain: string): Promise<boolean> => {
  const inviteData = await db
    .collection("userInvite")
    .where("userInfo.email", "==", email)
    .where("domain", "==", domain)
    .get();
  return !inviteData.empty;
};
