import { useEffect, useState } from "react";
import { useCollection, useCollectionOnce } from "react-firebase-hooks/firestore";
import { limit, orderBy, query, startAfter, where, documentId } from "firebase/firestore";
import db from "../services/firebase/firestore";
import { UsersTable } from "../views/Users/ColumnForUsersTable";
import { QueryConstraint } from "@firebase/firestore";
import { constructUsersForTable } from "../utils/constructUsersForTable";
import {
  changeUserCorporateInfo,
  ChangeUserCorporateInfoProps,
} from "../utils/requests/updateUserCorporateInfo";

function compare(a1: Array<string>, a2: Array<string>) {
  return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
}

const useUsers = (limits: number) => {
  const [load, setLoad] = useState(true);

  const [isLastClickBack, setIsLastClickBack] = useState(false);

  const [usersForTable, setUsersForTable] = useState<UsersTable[]>();

  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>([]);

  const [isUpdate, setIsUpdate] = useState(false);

  const [isFiltering, setIsFiltering] = useState(true);

  const [disableNext, setDisableNext] = useState(false);

  const [disableBack, setDisableBack] = useState(true);

  const [paginationQueryConstraint, setPaginationQueryConstraint] = useState<QueryConstraint[]>([
    orderBy("fullName"),
  ]);

  const [findByDeps, setFindByDeps] = useState<QueryConstraint[]>([limit(1)]);

  const [findHead, setFindHeads] = useState([limit(1)]);

  const [usersCollection, loadingUsersCollections] = useCollection(
    query(db.collections.users, ...queryConstraint, ...paginationQueryConstraint, limit(limits)),
    { snapshotListenOptions: { includeMetadataChanges: false } }
  );
  const [departmentsCollection, loadingDepartmentsCollection] = useCollectionOnce(
    query(db.collections.departments, ...findByDeps)
  );
  const [headsCollection, loadingHeadsCollection] = useCollectionOnce(
    query(db.collections.users, ...findHead)
  );

  const update = async (props: ChangeUserCorporateInfoProps) => {
    await changeUserCorporateInfo(props);
    setIsUpdate(true);
  };

  useEffect(() => {
    if (isUpdate) {
      const users = constructUsersForTable(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        usersCollection,
        departmentsCollection,
        headsCollection
      );
      setUsersForTable(isLastClickBack ? users.reverse().slice(0, 5) : users.slice(0, 5));
      setIsUpdate(false);
    }
  }, [isUpdate]);

  const filter = (queries: QueryConstraint[]) => {
    setIsFiltering(true);
    setQueryConstraint(queries);
    setPaginationQueryConstraint([]);
  };

  useEffect(() => {
    setLoad(true);
    if (!loadingUsersCollections && usersCollection) {
      if (usersCollection.docs.length < 6) {
        isLastClickBack ? setDisableBack(true) : setDisableNext(true);
      }
      if (isFiltering) {
        setDisableBack(true);
        setDisableNext(false);
        if (usersCollection.docs.length < 6) {
          setDisableNext(true);
        }
      }

      if (isFiltering) {
        if (usersCollection.docs.length < 6) {
          setDisableBack(true);
          setDisableNext(true);
        }
        if (usersCollection.docs.length === 6) {
          setDisableNext(false);
        }
      }

      const deps = usersCollection.docs.map((d) => d.data().departmentId).filter((f) => f !== "");
      if (deps.length > 0) {
        if (
          departmentsCollection &&
          compare(deps.sort(), departmentsCollection.docs.map((doc) => doc.id).sort())
        ) {
          const users = constructUsersForTable(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            usersCollection,
            departmentsCollection,
            headsCollection
          );
          setUsersForTable(isLastClickBack ? users.reverse().slice(1, 6) : users.slice(0, 5));
          setLoad(false);
        }
        setFindByDeps([where(documentId(), "in", deps)]);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const users = constructUsersForTable(usersCollection);
        setUsersForTable(isLastClickBack ? users.reverse().slice(1, 6) : users.slice(0, 5));
        setLoad(false);
      }
    }
  }, [loadingUsersCollections]);

  useEffect(() => {
    if (usersCollection?.docs.length === 6) {
      setDisableNext(false);
    }
    if (!loadingUsersCollections) {
      const users = constructUsersForTable(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        usersCollection,
        departmentsCollection,
        headsCollection
      );
      setUsersForTable(isLastClickBack ? users.reverse().slice(1, 6) : users.slice(0, 5));
    }
  }, [usersCollection]);

  useEffect(() => {
    if (!loadingDepartmentsCollection) {
      if (departmentsCollection) {
        const idHeads = departmentsCollection.docs
          .map((d) => d.data().headId)
          .filter((head) => head !== "");
        if (usersCollection && headsCollection && idHeads && idHeads.length > 0) {
          if (compare(headsCollection.docs.map((d) => d.id).sort(), idHeads.sort())) {
            const users = constructUsersForTable(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              usersCollection,
              departmentsCollection,
              headsCollection
            );
            setUsersForTable(isLastClickBack ? users.reverse().slice(1, 6) : users.slice(0, 5));
            setLoad(false);
          } else {
            setFindHeads([where(documentId(), "in", idHeads)]);
          }
        } else {
          const users = constructUsersForTable(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            usersCollection,
            departmentsCollection
          );
          setUsersForTable(isLastClickBack ? users.reverse().slice(1, 6) : users.slice(0, 5));
        }
      }
    }
  }, [loadingDepartmentsCollection]);

  useEffect(() => {
    if (!loadingHeadsCollection) {
      if (usersCollection && headsCollection && departmentsCollection) {
        const users = constructUsersForTable(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          usersCollection,
          departmentsCollection,
          headsCollection
        );
        setUsersForTable(isLastClickBack ? users.reverse().slice(0, 5) : users.slice(0, 5));
        setLoad(false);
      }
    }
  }, [loadingHeadsCollection]);

  const back = () => {
    setIsLastClickBack(true);
    setIsFiltering(false);
    setDisableNext(false);
    if (!usersCollection) {
      return;
    }
    const users = usersCollection.docs.map((doc) => doc.data());
    const lastVisible = isLastClickBack ? users.reverse()[1] : users[0];
    setPaginationQueryConstraint([
      orderBy("fullName", "desc"),
      startAfter(lastVisible.fullName),
      limit(limits),
    ]);

    setIsLastClickBack(true);
  };
  const next = () => {
    setIsLastClickBack(false);
    setDisableBack(false);
    setIsFiltering(false);
    if (!usersCollection) {
      return;
    }
    const users = usersCollection.docs.map((doc) => doc.data());

    const lastVisible = isLastClickBack
      ? users.reverse()[users.length - 1]
      : users[users.length - 2];
    setPaginationQueryConstraint([orderBy("fullName"), startAfter(lastVisible.fullName)]);

    setIsLastClickBack(false);
  };
  const clearFilter = () => {
    setIsFiltering(true);
    setQueryConstraint([]);
    setPaginationQueryConstraint([orderBy("fullName")]);
  };

  return {
    usersForTable,
    filter,
    clearFilter,
    back,
    next,
    load,
    disableNext,
    disableBack,
    update,
  };
};

export default useUsers;
