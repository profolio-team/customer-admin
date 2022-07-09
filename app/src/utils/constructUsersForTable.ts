import { QuerySnapshot } from "@firebase/firestore-types";
import { UsersTable } from "../views/Users/ColumnForUsersTable";
import { DepartmentInfo, UserInfo } from "../../../typescript-types/db.types";

export function constructUsersForTable(
  usersCollection: QuerySnapshot<UserInfo>,
  departmentsCollection?: QuerySnapshot<DepartmentInfo>,
  headsCollection?: QuerySnapshot<UserInfo>
): UsersTable[] {
  if (!departmentsCollection) {
    return usersCollection?.docs.map((use) => {
      return {
        ...use.data(),
        head: "none",
        department: "none",
      };
    });
  }

  if (!headsCollection) {
    return usersCollection?.docs.map((userDoc) => {
      const department = departmentsCollection.docs.find(
        (d) => d.id === userDoc.data().departmentId
      );
      if (!department) {
        return {
          ...userDoc.data(),
          head: "none",
          department: "none",
        };
      }
      return {
        ...userDoc.data(),
        head: "none",
        department: department.data().name,
      };
    });
  }

  return usersCollection?.docs.map((userDoc) => {
    const department = departmentsCollection.docs.find((d) => d.id === userDoc.data().departmentId);
    if (!department) {
      return {
        ...userDoc.data(),
        head: "none",
        department: "none",
      };
    }
    const head = headsCollection.docs.find((h) => {
      return h.id === department.data().headId;
    });
    return {
      ...userDoc.data(),
      head: head ? `${head.data().firstName} ${head.data().lastName}` : "none",
      department: department.data().name,
    };
  });
}
