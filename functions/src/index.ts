import { registerCompany } from "./callable/company";
import { getUserDomainByEmail, inviteUser } from "./callable/user";

export const user = {
  getUserDomainByEmail,
};

export const registration = {
  registerCompany,
  inviteUser,
};
