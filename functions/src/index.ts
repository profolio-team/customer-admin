import { confirmCompany, registerCompany } from "./callable/company";
import { resetDatabase, generateUsers } from "./callable/devTools";
import { getUserDomainByEmail, inviteUser, getInviteStatus, acceptInvite } from "./callable/user";

export const user = {
  getUserDomainByEmail,
  getInviteStatus,
  acceptInvite,
};

export const registration = {
  registerCompany,
  confirmCompany,
  inviteUser,
};

export const devTool = {
  resetDatabase,
  generateUsers,
};
