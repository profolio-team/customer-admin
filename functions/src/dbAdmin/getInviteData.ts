import { UserInvite } from "../../../typescript-types/db.types";
import { db } from "../firebase";

export const getInviteData = async (
  email: string,
  domain: string,
  inviteUserHash: string
): Promise<UserInvite | null> => {
  const dbInviteData = await db
    .collection("userInvite")
    .where("email", "==", email)
    .where("domain", "==", domain)
    .where("inviteUserHash", "==", inviteUserHash)
    .get();

  if (dbInviteData.empty) {
    return null;
  }
  return dbInviteData.docs[0].data() as UserInvite;
};
