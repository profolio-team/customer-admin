import * as functions from "firebase-functions";

import { UserInfo, DepartmentInfo, UserParams } from "../../../typescript-types/db.types";
import { createCompanyDatabaseStructure } from "../dbAdmin/createCompanyDatabaseStructure";
import { deleteAllUsers } from "../dbAdmin/deleteAllUsers";
import { deleteCollection } from "../dbAdmin/deleteCollection";
import { insertUserIntoCompany } from "../dbAdmin/insertUserIntoCompany";
import { insertDepartmentIntoCompany } from "../dbAdmin/insertDepartmentIntoCompany";
import { fillDepartmentsWithRandomUsers } from "../dbAdmin/fillDepartmentsWithRandomUsers";
import { setUserNewPassword } from "../dbAdmin/setUserNewPassword";
import { Chance } from "chance";
import { registerCompanyInDatabase } from "../dbAdmin/registerCompanyInDatabase";
import { MINUTE } from "../utils/time";
import { db } from "../firebase";

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

interface generateUsers {
  role: string;
  fullEmail: string;
  domain: string;
  countOfUsers?: number;
  filtering: UserParams;
}

const generateUsers = async ({
  role,
  fullEmail,
  countOfUsers = 5,
  domain,
  filtering,
}: generateUsers) => {
  for (let userIndex = 1; userIndex <= countOfUsers; userIndex++) {
    const email = fullEmail || `${role}${userIndex}@${domain}.com`;
    const chance = new Chance();
    const userInfo: UserInfo = {
      fullName: `${chance.first()} ${chance.last()}`,
      phone: chance.phone(),
      email,
      about: chance.paragraph({ sentences: 1 }),
      linkedInUrl: chance.url(),
      location: chance.country({ full: true }),
      grade: chance.pickone(filtering.grades),
      isActive: chance.bool(),
      job: chance.pickone(filtering.jobs),
      role: role,
      departmentId: "",
    };

    await insertUserIntoCompany({ email, domain, userInfo });
    await setUserNewPassword(email, "123123");
  }
};

const generateDepartments = async (domain: string, countOfDepartments = 4) => {
  for (let userIndex = 1; userIndex <= countOfDepartments; userIndex++) {
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

    const filteringDoc = await db
      .collection("companies")
      .doc(domain)
      .collection("config")
      .doc("userParams")
      .get();
    console.log(filteringDoc.data());
    const filteringFields = filteringDoc.data() as UserParams;

    if (filteringFields) {
      filteringFields.roles.map(async (role) => {
        await generateUsers({ role, fullEmail: "", domain, filtering: filteringFields });
      });
    }
    await generateUsers({
      role: "user",
      fullEmail: "multiuser@gmail.com",
      domain,
      countOfUsers: 1,
      filtering: filteringFields,
    });
    await generateDepartments(domain);
  }
  await fillDepartmentsWithRandomUsers("company1");
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
