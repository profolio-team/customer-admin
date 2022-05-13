import { DepartmentInfo } from "../../../../typescript-types/db.types";
import { doc, updateDoc, addDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { DepartmentForm } from "../../components/Departmens/DepartmentForm";
import { FullUserInfo } from "../Users/AllUsers";

export function CreateDepartment({ users }: { users: FullUserInfo[] }) {
  const defaultValue = {
    name: "",
    head: "",
  };

  const createDepartment = async (newDepartment: DepartmentInfo) => {
    await addDoc(db.departments, newDepartment).then(function (docRef) {
      updateDoc(doc(db.adminUserInfos, newDepartment.head), { departmentID: docRef.id });
    });
  };
  return (
    <DepartmentForm users={users} createDepartment={createDepartment} defaultValue={defaultValue} />
  );
}
