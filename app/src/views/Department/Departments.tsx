import { useParams } from "react-router-dom";
import { Department, DepartmentTable } from "./DepartmentTable";
import { NotFoundPage } from "../Error/NotFoundPage";
import { DepartmentInfoTable } from "../params/CheckParams";
import { FullUserInfo } from "../Users/AllUsers";
import { CreateDepartment } from "./CreateDepartment";
import { ChangeDepartment } from "./ChangeDepartment";

interface DepartmentsProps {
  departmentsTableData: DepartmentInfoTable[];
  users: FullUserInfo[];
}

export function Departments({ departmentsTableData, users }: DepartmentsProps) {
  const { unit, event } = useParams();
  if (unit === "all") {
    return <DepartmentTable departments={departmentsTableData} />;
  }
  if (event === "changes") {
    const depart = departmentsTableData.find((e) => e.id === unit);
    if (depart) {
      return <ChangeDepartment users={users} department={depart} />;
    }
    return <NotFoundPage />;
  }
  if (unit === "create") {
    return <CreateDepartment users={users} />;
  }
  if (event === "invites") {
    if (departmentsTableData.find((u) => u.id === unit)) {
      return <Department id={unit || ""} users={users} />;
    }
    return <NotFoundPage />;
  }

  return <NotFoundPage />;
}
