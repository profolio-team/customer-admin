import { admin } from "../firebase";
import { getAuthUser } from "../auth/getAuthUser";

export const setUserNewPassword = async (email: string, newPassword: string): Promise<void> => {
  const authUserData = await getAuthUser(email);
  if (!authUserData) {
    return;
  }
  const uid = authUserData.uid;

  await admin.auth().updateUser(uid, {
    email: authUserData.email,
    phoneNumber: authUserData.phoneNumber,
    emailVerified: authUserData.emailVerified,
    password: newPassword,
    displayName: authUserData.displayName,
    photoURL: authUserData.photoURL,
    disabled: authUserData.disabled,
  });
};
