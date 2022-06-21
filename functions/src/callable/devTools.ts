import * as functions from "firebase-functions";
import { UserInfo, DepartmentInfo } from "../../../typescript-types/db.types";
import { createCompanyDatabaseStructure } from "../dbAdmin/createCompanyDatabaseStructure";
import { deleteAllUsers } from "../dbAdmin/deleteAllUsers";
import { deleteCollection } from "../dbAdmin/deleteCollection";
import { insertUserIntoCompany } from "../dbAdmin/insertUserIntoCompany";
import { insertDepartmentIntoCompany } from "../dbAdmin/insertDepartmentIntoCompany";
import { setUserNewPassword } from "../dbAdmin/setUserNewPassword";
import { Chance } from "chance";
import { registerCompanyInDatabase } from "../dbAdmin/registerCompanyInDatabase";
import { MINUTE } from "../utils/time";

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
    const userInfo: UserInfo = {
      firstName: chance.first(),
      lastName: chance.last(),
      phone: chance.phone(),
      email,
      about: chance.paragraph({ sentences: 1 }),
      linkedInUrl: chance.url(),
      location: chance.country({ full: true }),
      grade: chance.pickone(["Middle", "Junior", "Senior"]),
      isActive: chance.bool(),
      job: chance.pickone(["Dev", "UX", "BA"]),
      role: role,
      departmentId: "",
    };

    await insertUserIntoCompany({ email, domain, userInfo });
    await setUserNewPassword(email, "123123");
  }
};

const generateDepartments = async (domain: string, countOfDepartments = 4) => {

  for (let companyIndex = 1; companyIndex <= countOfDepartments; companyIndex++) {
    const chance = new Chance();
    const departmentInfo: DepartmentInfo = {
      name: chance.word(),
      headId: "",

    };

    await insertDepartmentIntoCompany({ domain, departmentInfo });
  }
};

const generateDatabaseWithUsers = async () => {
  await dropDatabase();

  for (let companyIndex = 1; companyIndex <= 3; companyIndex++) {
    const domain = `company${companyIndex}`;
    await registerCompanyInDatabase(domain, MINUTE, true);
    await createCompanyDatabaseStructure(domain);

    await generateUsers("admin", "", domain);
    await generateUsers("user", "", domain);
    await generateUsers("user", "multiuser@gmail.com", domain, 1);
    await generateDepartments(domain);
  }
  await insertDepartmentIntoUsers();
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
