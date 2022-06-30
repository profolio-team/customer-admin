import { db } from "../firebase";
import { Chance } from "chance";

export const insertDepartmentIntoUsers = async (): Promise<void> => {
  const countOfmodifiedUser = 5;
  const chance = new Chance();
  const usersCollection = await db.collection("companies").doc("company1").collection("users");
  const snapshotUser = await usersCollection.get();
  const departmentCollection = await db
    .collection("companies")
    .doc("company1")
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
    usersCollection
      .doc(usersArray[userIndex])
      .update({ departmentID: chance.pickone([...departmentsArray]) });
  }

  insertHeadIntoDepartment(departmentsArray);
};

const insertHeadIntoDepartment = async (departmentArray: string[]): Promise<void> => {
  const usersCollection = await db.collection("companies").doc("company1").collection("users");
  const snapshotUser = await usersCollection.get();
  const departmentCollection = await db
    .collection("companies")
    .doc("company1")
    .collection("departments");

  snapshotUser.forEach((doc) => {
    if (departmentArray.includes(doc.data().departmentID)) {
      departmentCollection.doc(doc.data().departmentID).update({ headID: doc.id });
    }
  });
};
