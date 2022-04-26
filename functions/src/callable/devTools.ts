import * as functions from "firebase-functions";

import { CompanyVerification, UserInfo, UserRoles } from "../../../typescript-types/db.types";
import { createCompanyDatabaseStructure } from "../dbAdmin/createCompanyDatabaseStructure";
import { deleteAllUsers } from "../dbAdmin/deleteAllUsers";
import { deleteCollection } from "../dbAdmin/deleteCollection";
import { insertUserIntoCompany } from "../dbAdmin/insertUserIntoCompany";
import { setUserNewPassword } from "../dbAdmin/setUserNewPassword";
import { generateUniqHash } from "../utils/hash";
import { Chance } from "chance";

export interface DeleteDatabaseResponce {
  error: string;
}

const dropDatabase = async () => {
  await deleteAllUsers();
  await deleteCollection("companies");
  await deleteCollection("companyVerification");
  await deleteCollection("userResetPassword");
  await deleteCollection("userInvite");
};

export const deleteDatabase = functions.https.onCall(async (): Promise<DeleteDatabaseResponce> => {
  try {
    await dropDatabase();

    return {
      error: "",
    };
  } catch (e) {
    return {
      error: JSON.stringify(e),
    };
  }
});

export interface GenerateDataBaseResponce {
  error: string;
}

const generateUsers = async (
  prefix: string,
  fullEmail: string,
  domain: string,
  roles: UserRoles,
  countOfUsers = 5
) => {
  for (let userIndex = 1; userIndex <= countOfUsers; userIndex++) {
    const email = fullEmail || `${prefix}${userIndex}@${domain}.com`;
    const chance = new Chance();

    const userInfo: UserInfo = {
      firstName: chance.first(),
      lastName: chance.last(),
      phone: chance.phone(),
      email,
      about: chance.paragraph({ sentences: 1 }),
      linkedInUrl: chance.url(),
    };

    await insertUserIntoCompany(email, domain, roles, userInfo);
    await setUserNewPassword(email, "123123");
  }
};

const generateDatabaseWithUsers = async () => {
  await dropDatabase();

  for (let companyIndex = 1; companyIndex <= 3; companyIndex++) {
    const domain = `company${companyIndex}`;
    const companyVerificationData: CompanyVerification = {
      confirmCompanyHash: await generateUniqHash(),
      isVerified: true,
    };
    await createCompanyDatabaseStructure(domain, companyVerificationData);

    await generateUsers("admin", "", domain, { isAdmin: true, isOwner: true });
    await generateUsers("user", "", domain, { isAdmin: false, isOwner: false });
    await generateUsers(
      "user",
      "multiuser@gmail.com",
      domain,
      { isAdmin: false, isOwner: false },
      1
    );
  }
};

export const generateDatabaseRequest = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "1GB",
  })
  .https.onRequest(async (req, res) => {
    try {
      await generateDatabaseWithUsers();
      res.send("ok");
    } catch (e) {
      console.log(e);
      res.send("ok");
    }
  });

export const generateDatabase = functions.https.onCall(
  async (): Promise<GenerateDataBaseResponce> => {
    try {
      await generateDatabaseWithUsers();

      return {
        error: "",
      };
    } catch (e) {
      return {
        error: JSON.stringify(e),
      };
    }
  }
);
