import { confirmCompany } from "./callable/company/confirmCompany";
import { registerCompany } from "./callable/company/registerCompany";

import { deleteDatabase, generateDatabase, generateDatabaseRequest } from "./callable/devTools";
import { acceptInvite } from "./callable/invite/acceptInvite";
import { getUserDomainByEmail } from "./callable/user/getUserDomainByEmail";
import { inviteUser } from "./callable/invite/inviteUser";
import { resetPassword } from "./callable/user/resetPassword";
import { setPassword } from "./callable/user/setPassword";
import { isNeedSetPassword } from "./callable/user/isNeedSetPassword";

import { getDataFromSheet } from "./test/getDataFromSheetExample";
import { testHttpRequest } from "./test/httpRequestExample";
import { exampleOfCronJob } from "./test/cronExample";

export const user = {
  getUserDomainByEmail,
  resetPassword,
  setPassword,
  isNeedSetPassword,
};

export const invite = {
  acceptInvite,
  inviteUser,
};

export const registration = {
  registerCompany,
  confirmCompany,
};

export const devTool = {
  deleteDatabase,
  generateDatabaseRequest,
  generateDatabase,
};

export const test = {
  getDataFromSheet,
  testHttpRequest,
  exampleOfCronJob,
};
