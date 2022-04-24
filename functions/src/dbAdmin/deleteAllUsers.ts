import { admin } from "../firebase";

export async function deleteAllUsers(): Promise<void> {
  const listUsers = await admin.auth().listUsers();

  listUsers.users.forEach(async (user) => {
    await admin.auth().deleteUser(user.uid);
  });
}
