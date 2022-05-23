import { AdminUserInfo, UserInvitationData } from "../../../typescript-types/db.types";
import { db } from "../firebase";
import { generateUniqHash } from "../utils/hash";
interface createUserInvitationProps {
  domain: string;
  userInfo: AdminUserInfo;
}
export const createUserInvitation = async (data: createUserInvitationProps): Promise<string> => {
  const inviteUserHash = await generateUniqHash();
  const userInviteData: UserInvitationData = {
    inviteUserHash,
    domain: data.domain,
    userInfo: {
      ...data.userInfo,
      about: "",
      linkedInUrl: "",
      phone: "",
    },
  };
  await db.collection("userInvite").add(userInviteData);
  return inviteUserHash;
};
