import { registerCompany } from "./callable/registration";
import { handleUserCreate } from "./triggers/user";
import { getDomainByEmail } from "./callable/user";

export const user = {
  create: handleUserCreate,
  getDomainByEmail,
};

export const registration = {
  registerCompany,
};
