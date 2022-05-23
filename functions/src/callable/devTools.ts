import * as functions from "firebase-functions";

import { CompanyVerification, UserInfoInvitation } from "../../../typescript-types/db.types";
import { createCompanyDatabaseStructure } from "../dbAdmin/createCompanyDatabaseStructure";
import { deleteAllUsers } from "../dbAdmin/deleteAllUsers";
import { deleteCollection } from "../dbAdmin/deleteCollection";
import { insertUserIntoCompany } from "../dbAdmin/insertUserIntoCompany";
import { setUserNewPassword } from "../dbAdmin/setUserNewPassword";
import { generateUniqHash } from "../utils/hash";
import { Chance } from "chance";

export interface DeleteDatabaseResponse {
  error: string;
}

const dropDatabase = async () => {
  await deleteAllUsers();
  await deleteCollection("companies");
  await deleteCollection("companyVerification");
  await deleteCollection("userResetPassword");
  await deleteCollection("userInvite");
};

export const deleteDatabase = functions.https.onCall(async (): Promise<DeleteDatabaseResponse> => {
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

export interface GenerateDataBaseResponse {
  error: string;
}

const generateUsers = async (role: string, fullEmail: string, domain: string, countOfUsers = 5) => {
  for (let userIndex = 1; userIndex <= countOfUsers; userIndex++) {
    const email = fullEmail || `${role}${userIndex}@${domain}.com`;
    const chance = new Chance();
    const userInfo: UserInfoInvitation = {
      firstName: chance.first(),
      lastName: chance.last(),
      phone: chance.phone(),
      email,
      about: chance.paragraph({ sentences: 1 }),
      linkedInUrl: chance.url(),
      project: "Project",
      location: chance.country({ full: true }),
      grade: chance.pickone(["Middle", "Junior", "Senior"]),
      isActive: chance.bool(),
      job: chance.pickone(["Dev", "UX", "BA"]),
      role: role,
    };

    await insertUserIntoCompany(email, domain, userInfo);
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

    await generateUsers("admin", "", domain);
    await generateUsers("user", "", domain);
    await generateUsers("user", "multiuser@gmail.com", domain, 1);
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
  async (): Promise<GenerateDataBaseResponse> => {
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
