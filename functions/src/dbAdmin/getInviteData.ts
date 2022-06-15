import { UserInvitationData } from "../../../typescript-types/db.types";
import { db } from "../firebase";

interface getInviteDataProps {
  domain: string;
  inviteUserHash: string;
}

export const getInviteData = async ({
  domain,
  inviteUserHash,
}: getInviteDataProps): Promise<UserInvitationData | null> => {
  const dbInviteData = await db
    .collection("userInvite")
    .where("domain", "==", domain)
    .where("inviteUserHash", "==", inviteUserHash)
    .get();

  if (dbInviteData.empty) {
    return null;
  }
  return dbInviteData.docs[0].data() as UserInvitationData;
};
