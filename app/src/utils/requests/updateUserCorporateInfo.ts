import { doc, updateDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";
import { UpdateData } from "@firebase/firestore";
export interface ChangeUserCorporateInfoProps {
  data: UpdateData<UserInfo>;
  uid: string;
}
export const changeUserCorporateInfo = async ({
  data,
  uid,
}: ChangeUserCorporateInfoProps): Promise<{ result: boolean; message: string }> => {
  return await updateDoc(doc(db.collections.users, uid), data).then(() => {
    return { result: true, message: "User update" };
  });
};
