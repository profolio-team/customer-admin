import { DepartmentTable } from "./DepartmentTable";
import { DepartmentInfoTable } from "../../views/params/CheckParams";

export function DepartmentView() {
  const departmentsTableData: DepartmentInfoTable[] = [
    {
      name: "string",
      headName: "string",
      headID: "string",
      id: "string",
      current: 12,
    },
  ];

  return <DepartmentTable departments={departmentsTableData} />;
}
