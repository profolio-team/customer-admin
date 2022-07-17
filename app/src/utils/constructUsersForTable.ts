import { UsersTable } from "../views/Users/ColumnForUsersTable";
import { UserInfo } from "../../../typescript-types/db.types";
import { DepartmentForUserTable } from "../hooks/Users/useDepartments";

const notHaveHeadOrDepartment = "none";

export interface UserInfoWithID extends UserInfo {
  uid: string;
}

export function constructUsersForTable(
  usersCollection: UserInfoWithID[],
  departments: DepartmentForUserTable[]
): UsersTable[] {
  return usersCollection.map((user) => {
    const department = departments.find(
      (department) => department.departmentId === user.departmentId
    );
    if (department) {
      return {
        ...user,
        head: department.headName,
        department: department.name,
      };
    }
    return {
      ...user,
      head: notHaveHeadOrDepartment,
      department: notHaveHeadOrDepartment,
    };
  });
}
