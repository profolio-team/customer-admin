import { db } from "../firebase";

export const isUserInCompany = async (email: string, domain: string): Promise<boolean> => {
  const companyUserProfile = await db
    .collection(`companies/${domain}/users`)
    .where("email", "==", email)
    .get();
  return !companyUserProfile.empty;
};
