import { inviteUser, registerCompany } from "./callable/registration";
import { getUserDomainByEmail } from "./callable/user";

export const user = {
  getUserDomainByEmail,
};

export const registration = {
  registerCompany,
  inviteUser,
};
