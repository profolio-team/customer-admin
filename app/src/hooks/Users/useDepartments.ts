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

  const { heads, setHeadList, loadingHeadsCollection } = useHeads();

  useEffect(() => {
    setLoadingDepartments(true);
    if (!loadingDepartmentsCollection && departmentsCollection) {
      if (heads || departmentIds.length === 0) {
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
      const headsId = departmentsCollection.docs
        .map((d) => d.data().headId)
        .filter((f) => f !== "")
        .sort();
      if (heads) {
        console.log("compare");
        console.log(compare(headsId.sort(), heads.map((h) => h.headId).sort()));
        console.log(headsId.sort());
        console.log(heads.map((h) => h.headId).sort());
      }
      if (!(heads && compare(headsId.sort(), heads.map((h) => h.headId).sort()))) {
        console.log("lol");
        setHeadList(headsId);
      }
    }
  }, [loadingDepartmentsCollection, loadingHeadsCollection]);

  const updateDepartmentList = (depList: string[]) => {
    const departmentsIds = depList.filter((f) => f !== "").sort();
    if (departmentsIds.length !== 0) {
      setDepartmentId(departmentsIds);
      setFindByDeps([where(documentId(), "in", departmentsIds)]);
    } else {
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
