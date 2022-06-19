import { UserInfo, UserInvitationData } from "../../../typescript-types/db.types";
import { Timestamp } from "@firebase/firestore-types";
import firebase, { db } from "../firebase";
import { generateUniqHash } from "../utils/hash";
const { FieldValue } = firebase.firestore;

interface createUserInvitationProps {
  domain: string;
  userInfo: UserInfo;
}
export const createUserInvitation = async ({
  domain,
  userInfo,
}: createUserInvitationProps): Promise<string> => {
  const inviteUserHash = await generateUniqHash();
  const createdAt = FieldValue.serverTimestamp() as Timestamp;
  const userInviteData: UserInvitationData = {
    inviteUserHash,
    domain,
    userInfo,
    createdAt,
  };
  await db.collection("userInvite").add(userInviteData);
  return inviteUserHash;
};
