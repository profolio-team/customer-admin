import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { documentId, limit, query, where } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { useEffect, useState } from "react";
import { QueryConstraint } from "@firebase/firestore";
import useHeads from "./useHeads";
import { compare } from "./useUsers";

export interface DepartmentForUserTable {
  name: string;
  headName: string;
  headId: string;
  departmentId: string;
}

const useDepartments = () => {
  const [updatedDepartment, setUpdatedDepartment] = useState<boolean>(false);

  const [loadingDepartments, setLoadingDepartments] = useState<boolean>(false);

  const [departments, setDepartments] = useState<DepartmentForUserTable[]>([]);

  const [departmentIds, setDepartmentId] = useState<string[]>([]);

  const [findByDeps, setFindByDeps] = useState<QueryConstraint[]>([limit(1)]);

  const [departmentsCollection, loadingDepartmentsCollection] = useCollectionOnce(
    query(db.collections.departments, ...findByDeps)
  );

  const { heads, updateHeadList, loadingHeadsCollection } = useHeads();

  useEffect(() => {
    setLoadingDepartments(true);
    if (!loadingDepartmentsCollection && departmentsCollection && !loadingHeadsCollection) {
      const headsId = departmentsCollection.docs.map((d) => d.data().headId);
      updateHeadList(headsId);
    }
  }, [loadingDepartmentsCollection]);

  useEffect(() => {
    if (departmentsCollection && (heads || departmentIds.length === 0)) {
      const headsIdInDepartmentDocs: DepartmentForUserTable[] = departmentsCollection.docs.map(
        (departmentDoc) => {
          let headName = "none";
          if (departmentDoc.data().headId !== "" && heads) {
            const head = heads.find((h) => h.headId === departmentDoc.data().headId);
            head ? (headName = head.fullName) : "none";
          }
          return {
            departmentId: departmentDoc.id,
            ...departmentDoc.data(),
            headName,
          };
        }
      );
      setDepartments(headsIdInDepartmentDocs);
      setLoadingDepartments(false);
      setUpdatedDepartment(!updatedDepartment);
    }
  }, [heads]);

  const updateDepartmentList = (depList: string[]) => {
    const departmentsIds = depList.filter((f) => f !== "").sort();
    if (compare(departmentsIds, departmentIds)) {
      setUpdatedDepartment(!updatedDepartment);
      setLoadingDepartments(false);
      return;
    }
    if (departmentsIds.length !== 0) {
      setDepartmentId(departmentsIds);
      setFindByDeps([where(documentId(), "in", departmentsIds)]);
    } else {
      setLoadingDepartments(false);
      setDepartments([]);
      setUpdatedDepartment(!updatedDepartment);
    }
  };

  return {
    itsUpdate: updatedDepartment,
    updateDepartmentList,
    departments,
    loadingDepartments,
  };
};

export default useDepartments;
