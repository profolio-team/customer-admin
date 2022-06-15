import { UserInfo, UserInvitationData } from "../../../typescript-types/db.types";
import { db } from "../firebase";
import { generateUniqHash } from "../utils/hash";
interface createUserInvitationProps {
  domain: string;
  userInfo: UserInfo;
}
export const createUserInvitation = async ({
  domain,
  userInfo,
}: createUserInvitationProps): Promise<string> => {
  const inviteUserHash = await generateUniqHash();
  const userInviteData: UserInvitationData = {
    inviteUserHash,
    domain,
    userInfo,
  };
  await db.collection("userInvite").add(userInviteData);
  return inviteUserHash;
};
