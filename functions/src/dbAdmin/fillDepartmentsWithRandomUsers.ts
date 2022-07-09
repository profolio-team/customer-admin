import { db } from "../firebase";
import { Chance } from "chance";

export const fillDepartmentsWithRandomUsers = async (companyName: string): Promise<void> => {
  const countOfmodifiedUser = 5;
  const chance = new Chance();
  const usersCollection = await db.collection("companies").doc(companyName).collection("users");
  const snapshotUser = await usersCollection.get();
  const departmentCollection = await db
    .collection("companies")
    .doc(companyName)
    .collection("departments");
  const snapshotDepartment = await departmentCollection.get();
  const usersArray: string[] = [];
  const departmentsArray: string[] = [];

  snapshotUser.forEach((doc) => {
    usersArray.push(doc.id);
  });

  snapshotDepartment.forEach((doc) => {
    departmentsArray.push(doc.id);
  });

  for (let userIndex = 1; userIndex <= countOfmodifiedUser; userIndex++) {
    await usersCollection
      .doc(usersArray[userIndex])
      .update({ departmentId: chance.pickone([...departmentsArray]) });
  }

  await contextHeadWithDepartment(departmentsArray, companyName);
};

const contextHeadWithDepartment = async (
  departmentsArray: string[],
  companyName: string
): Promise<void> => {
  const usersCollection = await db.collection("companies").doc(companyName).collection("users");
  const snapshotUser = await usersCollection.get();
  const departmentCollection = await db
    .collection("companies")
    .doc(companyName)
    .collection("departments");

  snapshotUser.forEach((doc) => {
    if (departmentsArray.includes(doc.data().departmentId)) {
      departmentCollection.doc(doc.data().departmentId).update({ headId: doc.id });
    }
  });
};
