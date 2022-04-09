import { registerCompany } from "./callable/company";
import { resetDatabase, generateUsers } from "./callable/devTools";
import { getUserDomainByEmail, inviteUser } from "./callable/user";

export const user = {
  getUserDomainByEmail,
};

export const registration = {
  registerCompany,
  inviteUser,
};

export const devTool = {
  resetDatabase,
  generateUsers,
};
