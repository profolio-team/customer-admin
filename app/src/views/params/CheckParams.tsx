import { useParams } from "react-router-dom";
import { DashboardPage } from "../Dashboard/Dashboard";
import React from "react";
import { DepartmentFields, UsersPage } from "../Users/UsersPage";
import { Departments } from "../Department/Departments";
import { NotFoundPage } from "../Error/NotFoundPage";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { UserInfoWithId } from "../Users/AllUsers";
import { Loader } from "../../components";

export interface DepartmentInfoTable {
  name: string;
  headName: string;
  headID: string;
  id: string;
  current: string;
}

export function CheckParams() {
  const { page } = useParams();
  if (page === undefined) {
    return <DashboardPage />;
  }
  const [usersCollection, loadingUsers] = useCollection(db.adminUserInfos);
  const [departmentsCollections, loadingDeps] = useCollection(db.departments);
  console.log(loadingUsers, "users");
  console.log(loadingDeps, "deps");
  if (!usersCollection || !departmentsCollections) {
    return <Loader />;
  }

  const departments = new Map(
    departmentsCollections.docs.map((doc) => {
      const headName = usersCollection.docs.find((e) => e.id === doc.data().head);
      if (headName) {
        return [
          doc.id,
          {
            name: doc.data().name,
            head: `${headName.data().firstName} ${headName.data().lastName}`,
          },
        ];
      }
      return [doc.id, { name: doc.data().name, head: `error` }];
    })
  );
  const users: UserInfoWithId[] = usersCollection.docs.map((usersDoc) => {
    return {
      id: usersDoc.id,
      ...usersDoc.data(),
      departmentName: departments.get(usersDoc.data().departmentID)?.name || "",
      headName: departments.get(usersDoc.data().departmentID)?.head || "",
    };
  });

  const curr = users
    .map((u) => u.departmentID)
    .reduce((acc, el) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
  console.log(curr);
  const departmentsTableData: DepartmentInfoTable[] = departmentsCollections.docs.map(
    (usersDoc) => {
      return {
        name: usersDoc.data().name,
        id: usersDoc.id,
        headName:
          usersCollection.docs.find((doc) => doc.id === usersDoc.data().head)?.data().firstName ||
          "",
        headID: usersDoc.data().head,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        current: curr[usersDoc.id],
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
