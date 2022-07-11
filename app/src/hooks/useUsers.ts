import { useEffect, useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { limit, orderBy, query, startAfter, where, documentId } from "firebase/firestore";
import db from "../services/firebase/firestore";
import { UsersTable } from "../views/Users/ColumnForUsersTable";
import { QueryConstraint } from "@firebase/firestore";
import { constructUsersForTable } from "../utils/constructUsersForTable";

function compare(a1: Array<string>, a2: Array<string>) {
  return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
}

const useUsers = (limits: number) => {
  const [load, setLoad] = useState(true);

  const [isLastClickBack, setIsLastClickBack] = useState(false);

  const [usersForTable, setUsersForTable] = useState<UsersTable[]>();

  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>([
    where("firstName", ">=", ""),
    where("firstName", "<=", "~"),
  ]);
  const [paginationQueryConstraint, setPaginationQueryConstraint] = useState<QueryConstraint[]>([
    orderBy("firstName"),
  ]);

  const [findByDeps, setFindByDeps] = useState<QueryConstraint[]>([limit(1)]);
  const [findHead, setFindHeads] = useState([limit(1)]);

  const [usersCollection, loadingUsersCollections] = useCollectionOnce(
    query(db.collections.users, ...queryConstraint, ...paginationQueryConstraint, limit(limits))
  );
  const [departmentsCollection, loadingDepartmentsCollection] = useCollectionOnce(
    query(db.collections.departments, ...findByDeps)
  );
  const [headsCollection, loadingHeadsCollection] = useCollectionOnce(
    query(db.collections.users, ...findHead)
  );
  const filter = (queries: QueryConstraint[]) => {
    setQueryConstraint(queries);
    setPaginationQueryConstraint([]);
  };

  useEffect(() => {
    setLoad(true);
    if (!loadingUsersCollections && usersCollection) {
      const deps = usersCollection.docs.map((d) => d.data().departmentId).filter((f) => f !== "");
      if (deps.length > 0) {
        setFindByDeps([where(documentId(), "in", deps)]);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUsersForTable(constructUsersForTable(usersCollection));
        setLoad(false);
      }
    }
  }, [loadingUsersCollections]);

  useEffect(() => {
    if (!loadingDepartmentsCollection) {
      if (departmentsCollection) {
        const idHeads = departmentsCollection.docs
          .map((d) => d.data().headId)
          .filter((head) => head !== "");
        if (usersCollection && headsCollection && idHeads && idHeads.length > 0) {
          if (compare(headsCollection.docs.map((d) => d.id).sort(), idHeads.sort())) {
            setUsersForTable(
              constructUsersForTable(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                usersCollection,
                departmentsCollection,
                headsCollection
              )
            );
            setLoad(false);
          } else {
            setFindHeads([where(documentId(), "in", idHeads)]);
          }
        } else {
          setUsersForTable(
            constructUsersForTable(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              usersCollection,
              departmentsCollection
            )
          );
        }
      }
    }
  }, [loadingDepartmentsCollection]);

  useEffect(() => {
    console.log(3);
    if (!loadingHeadsCollection) {
      if (usersCollection && headsCollection && departmentsCollection) {
        setUsersForTable(
          constructUsersForTable(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            usersCollection,
            departmentsCollection,
            headsCollection
          )
        );
        setLoad(false);
      }
    }
  }, [loadingHeadsCollection]);

  const back = () => {
    if (!usersForTable) {
      return;
    }
    const lastVisible = isLastClickBack ? usersForTable.reverse()[1] : usersForTable[0];
    setPaginationQueryConstraint([
      orderBy("firstName", "desc"),
      startAfter(lastVisible.firstName),
      limit(6),
    ]);

    setIsLastClickBack(true);
  };
  const next = () => {
    if (!usersForTable) {
      return;
    }
    const lastVisible = isLastClickBack
      ? usersForTable.reverse()[usersForTable.length - 1]
      : usersForTable[usersForTable.length - 2];
    setPaginationQueryConstraint([orderBy("firstName"), startAfter(lastVisible.firstName)]);

    setIsLastClickBack(false);
  };

  return {
    usersForTable,
    filter,
    back,
    next,
    load,
  };
};

export default useUsers;
