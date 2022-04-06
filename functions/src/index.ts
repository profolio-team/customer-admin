import { inviteUser, registerCompany } from "./callable/registration";
import { getDomainByEmail } from "./callable/user";

export const user = {
  getDomainByEmail,
};

export const registration = {
  registerCompany,
  inviteUser,
};
