import { useParams } from "react-router-dom";
import { DashboardPage } from "../Dashboard/Dashboard";
import React from "react";
import { DepartmentFields, UsersPage } from "../Users/UsersPage";
import { Departments } from "../Department/Departments";
import { NotFoundPage } from "../Error/NotFoundPage";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { FullUserInfo } from "../Users/AllUsers";
import { Loader } from "../../components";
import { currentUsersInDepartments, departmentsNamesAndHeadsNames } from "./utils";

export interface DepartmentInfoTable {
  name: string;
  headName: string;
  headID: string;
  id: string;
  current: number;
}

export function CheckParams() {
  const { page } = useParams();
  if (page === undefined) {
    return <DashboardPage />;
  }
  const [usersCollection] = useCollection(db.adminUserInfos);
  const [departmentsCollections] = useCollection(db.departments);
  if (!usersCollection || !departmentsCollections) {
    return <Loader />;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const NamesAndHeadsNames = departmentsNamesAndHeadsNames(departmentsCollections, usersCollection);
  const users: FullUserInfo[] = usersCollection.docs.map((usersDoc) => {
    return {
      id: usersDoc.id,
      ...usersDoc.data(),
      departmentName: NamesAndHeadsNames.get(usersDoc.data().departmentID)?.name || "",
      headName: NamesAndHeadsNames.get(usersDoc.data().departmentID)?.fullNameHead || "",
    };
  });

  const currentUsers = currentUsersInDepartments(users);
  const departmentsTableData: DepartmentInfoTable[] = departmentsCollections.docs.map(
    (departmentDoc) => {
      return {
        name: departmentDoc.data().name,
        id: departmentDoc.id,
        headName: NamesAndHeadsNames.get(departmentDoc.id)?.fullNameHead || "Error: Head not find",
        headID: departmentDoc.data().head,
        current: currentUsers[departmentDoc.id],
      };
    }
  );
  const departmentForMenu: DepartmentFields[] = departmentsCollections.docs.map(
    (departmentsDoc) => {
      return {
        name: `${departmentsDoc.data().name}`,
        id: departmentsDoc.id,
      };
    }
  );

  if (page === "user") {
    return <UsersPage users={users} departmentForMenu={departmentForMenu} />;
  }

  if (page === "department") {
    return <Departments departmentsTableData={departmentsTableData} users={users} />;
  }

  return <NotFoundPage />;
}
