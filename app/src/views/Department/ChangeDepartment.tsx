import { DepartmentInfo } from "../../../../typescript-types/db.types";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { DepartmentForm } from "./DepartmentForm";
import { FullUserInfo } from "../Users/AllUsers";
import { DepartmentInfoTable } from "../params/CheckParams";

interface ChangeDepartmentProps {
  users: FullUserInfo[];
  department: DepartmentInfoTable;
}

export function ChangeDepartment({ users, department }: ChangeDepartmentProps) {
  const defaultValue = {
    name: department.name,
    head: department.headID,
  };
  const createDepartment = async (departmentInfo: DepartmentInfo) => {
    await updateDoc(doc(db.departments, department.id), { ...departmentInfo });
  };
  return (
    <DepartmentForm users={users} createDepartment={createDepartment} defaultValue={defaultValue} />
  );
}
