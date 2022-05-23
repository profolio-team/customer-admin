import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebase";
import { companyName } from "../../utils/url.utils";
import {
  InviteUserRequest,
  InviteUserResponse,
} from "../../../../functions/src/callable/invite/inviteUser";
import { AdminUserFormFields } from "../AdminUserForm/AdminUserFormFields";

export async function invite(
  userInfo: AdminUserFormFields
): Promise<{ result: boolean; message: string }> {
  const inviteUser = httpsCallable<InviteUserRequest, InviteUserResponse>(
    functions,
    "invite-inviteUser"
  );
  if (!companyName) {
    return { result: false, message: "Company name is missing" };
  }

  const resultFromFunction = await inviteUser({
    domain: companyName,
    userInfo,
  });
  return resultFromFunction.data;
}
