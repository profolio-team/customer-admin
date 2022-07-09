import { QuerySnapshot } from "@firebase/firestore-types";
import { UsersTable } from "../views/Users/ColumnForUsersTable";
import { DepartmentInfo, UserInfo } from "../../../typescript-types/db.types";

const notHaveHeadOrDepartment = "none";

export function constructUsersForTable(
  usersCollection: QuerySnapshot<UserInfo>,
  departmentsCollection?: QuerySnapshot<DepartmentInfo>,
  headsCollection?: QuerySnapshot<UserInfo>
): UsersTable[] {
  if (!departmentsCollection) {
    return usersCollection?.docs.map((use) => {
      return {
        ...use.data(),
        head: notHaveHeadOrDepartment,
        department: notHaveHeadOrDepartment,
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
          head: notHaveHeadOrDepartment,
          department: notHaveHeadOrDepartment,
        };
      }
      return {
        ...userDoc.data(),
        head: notHaveHeadOrDepartment,
        department: department.data().name,
      };
    });
  }

  return usersCollection?.docs.map((userDoc) => {
    const department = departmentsCollection.docs.find((d) => d.id === userDoc.data().departmentId);
    if (!department) {
      return {
        ...userDoc.data(),
        head: notHaveHeadOrDepartment,
        department: notHaveHeadOrDepartment,
      };
    }
    const head = headsCollection.docs.find((h) => {
      return h.id === department.data().headId;
    });
    return {
      ...userDoc.data(),
      head: head ? `${head.data().firstName} ${head.data().lastName}` : notHaveHeadOrDepartment,
      department: department.data().name,
    };
  });
}
