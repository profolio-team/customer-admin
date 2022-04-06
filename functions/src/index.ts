import { inviteUser } from "./callable/registration";
import { registerCompany } from "./callable/company";
import { getUserDomainByEmail } from "./callable/user";

export const user = {
  getUserDomainByEmail,
};

export const registration = {
  registerCompany,
  inviteUser,
};
