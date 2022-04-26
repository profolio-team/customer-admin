import { UserInvite } from "../../../typescript-types/db.types";
import { db } from "../firebase";
import { generateUniqHash } from "../utils/hash";

export const inviteUserInDatabase = async (
  email: string,
  domain: string,
  isAdmin: boolean,
  isOwner: boolean
): Promise<string> => {
  const inviteUserHash = await generateUniqHash();
  const userInviteData: UserInvite = {
    isAdmin: isAdmin,
    isOwner: isOwner,
    inviteUserHash,
    email: email,
    domain: domain,
  };

  await db.collection("userInvite").add(userInviteData);
  return inviteUserHash;
};
