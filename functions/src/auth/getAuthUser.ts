import { UserRecord } from "firebase-functions/v1/auth";
import { admin } from "../firebase";

export async function getAuthUser(email: string): Promise<UserRecord | null> {
  return new Promise((resolve) => {
    admin
      .auth()
      .getUserByEmail(email)
      .then((user) => {
        resolve(user);
      })
      .catch(() => {
        resolve(null);
      });
  });
}
