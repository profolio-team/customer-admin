import { QuerySnapshot } from "@firebase/firestore-types";
import { UsersTable } from "../views/Users/ColumnForUsersTable";
import { UserInfo } from "../../../typescript-types/db.types";
import { DepartmentForUserTable } from "../hooks/Users/useDepartments";

const notHaveHeadOrDepartment = "none";

export function constructUsersForTable(
  usersCollection: QuerySnapshot<UserInfo>,
  departments: DepartmentForUserTable[]
): UsersTable[] {
  return usersCollection.docs.map((userDoc) => {
    const department = departments.find(
      (department) => department.departmentId === userDoc.data().departmentId
    );
    if (department) {
      return {
        ...userDoc.data(),
        uid: userDoc.id,
        head: department.headName,
        department: department.name,
      };
    }
    return {
      ...userDoc.data(),
      uid: userDoc.id,
      head: notHaveHeadOrDepartment,
      department: notHaveHeadOrDepartment,
    };
  });
}
