import { UserInfo, UserInvitationData } from "../../../typescript-types/db.types";
import { Timestamp } from "@firebase/firestore-types";
import firebase, { db } from "../firebase";
import { generateUniqHash } from "../utils/hash";
import { DAY } from "../utils/time";

interface createUserInvitationProps {
  domain: string;
  userInfo: UserInfo;
  expiredTimeDiff?: number;
}
export const createUserInvitation = async ({
  domain,
  userInfo,
  expiredTimeDiff = 30 * DAY,
}: createUserInvitationProps): Promise<string> => {
  const inviteUserHash = await generateUniqHash();

  const createdAt = firebase.firestore.Timestamp.now() as Timestamp;
  const expiredAt = firebase.firestore.Timestamp.fromMillis(createdAt.toMillis() + expiredTimeDiff);

  const userInviteData: UserInvitationData = {
    inviteUserHash,
    domain,
    userInfo,
    createdAt,
    expiredAt,
  };
  await db.collection("userInvite").add(userInviteData);
  return inviteUserHash;
};
