import { useParams } from "react-router-dom";
import { AllUsers, UserInfoWithId } from "./AllUsers";
import { CreateUser } from "./CreateUser";
import { ChangeUser } from "./ChangeUser";
import { NotFoundPage } from "../Error/NotFoundPage";

export interface DepartmentFields {
  name: string;
  id: string;
}

interface UsersPageProps {
  users: UserInfoWithId[];
  departmentForMenu: DepartmentFields[];
}

export function UsersPage({ users, departmentForMenu }: UsersPageProps) {
  const { unit } = useParams();
  if (unit === "all") {
    return <AllUsers users={users} />;
  }
  if (unit === "create") {
    return <CreateUser departments={departmentForMenu} />;
  }
  const user = users.find((e) => e.id === unit);
  if (user) {
    return <ChangeUser departments={departmentForMenu} user={user} />;
  }
  return <NotFoundPage />;
}
