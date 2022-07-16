import { useEffect, useState } from "react";
import { useCollection, useCollectionOnce } from "react-firebase-hooks/firestore";
import { limit, query, where, documentId } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { UsersTable } from "../../views/Users/ColumnForUsersTable";
import { QueryConstraint } from "@firebase/firestore";
import { constructUsersForTable } from "../../utils/constructUsersForTable";
import {
  changeUserCorporateInfo,
  ChangeUserCorporateInfoProps,
} from "../../utils/requests/updateUserCorporateInfo";
import usePagination from "./usePagination";

function compare(a1: Array<string>, a2: Array<string>) {
  return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
}

const useUsers = (limits: number) => {
  const [load, setLoad] = useState(true);

  const [usersForTable, setUsersForTable] = useState<UsersTable[]>();

  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>([]);

  const [isUpdate, setIsUpdate] = useState(false);

  const [isFiltering, setIsFiltering] = useState(true);

  const [findByDeps, setFindByDeps] = useState<QueryConstraint[]>([limit(1)]);

  const [findHead, setFindHeads] = useState([limit(1)]);

  const {
    clearPagination,
    paginationQueryConstraint,
    nextPaginationData,
    backPaginationData,
    isLastClickBack,
    setAvailabilityPagination,
    disableNextPagination,
    disableBackPagination,
  } = usePagination();

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
      construct();
    }
  }, [isUpdate]);

  const filter = (queries: QueryConstraint[]) => {
    setIsFiltering(true);
    setQueryConstraint(queries);
    clearPagination();
  };

  useEffect(() => {
    setLoad(true);
    if (!loadingUsersCollections && usersCollection) {
      setAvailabilityPagination(usersCollection.docs.length, isFiltering);

      const departmentsUser = usersCollection.docs.map((d) => d.data().departmentId);
      let departmentsID: string[] = [];
      if (departmentsCollection) {
        departmentsID = departmentsCollection.docs.map((doc) => doc.id);
      }
      const { isNeedSearch, paramForSearch } = checkForCaching(departmentsUser, departmentsID);

      if (isNeedSearch) {
        setFindByDeps([where(documentId(), "in", paramForSearch)]);
      } else construct();
    }
  }, [loadingUsersCollections]);

  useEffect(() => {
    if (usersCollection) {
      setAvailabilityPagination(usersCollection.docs.length, isFiltering);
    }
    if (!loadingUsersCollections) {
      construct();
    }
  }, [usersCollection]);

  useEffect(() => {
    if (!loadingDepartmentsCollection && departmentsCollection) {
      const headsIdInDepartmentDocs = departmentsCollection.docs.map((d) => d.data().headId);
      let heads: string[] = [];
      if (headsCollection) {
        heads = headsCollection.docs.map((d) => d.id);
      }

      const { isNeedSearch, paramForSearch } = checkForCaching(headsIdInDepartmentDocs, heads);

      if (isNeedSearch) {
        setFindHeads([where(documentId(), "in", paramForSearch)]);
      } else {
        construct();
      }
    }
  }, [loadingDepartmentsCollection]);

  useEffect(() => {
    if (!loadingHeadsCollection) {
      construct();
    }
  }, [loadingHeadsCollection]);

  const back = () => {
    const users = getUsers();
    if (!users) {
      return;
    }
    setIsFiltering(false);
    backPaginationData(users);
  };
  const next = () => {
    const users = getUsers();
    if (!users) {
      return;
    }
    setIsFiltering(false);
    nextPaginationData(users);
  };

  const getUsers = () => {
    if (!usersCollection) {
      return;
    }
    return usersCollection.docs.map((doc) => doc.data());
  };

  const construct = () => {
    const users = constructUsersForTable(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      usersCollection,
      departmentsCollection,
      headsCollection
    );
    setUsersForTable(
      isLastClickBack
        ? users.length === 5
          ? users.reverse()
          : users.reverse().slice(1, 6)
        : users.slice(0, 5)
    );
    setLoad(false);
  };

  const clearFilter = () => {
    setIsFiltering(true);
    setQueryConstraint([]);
    clearPagination();
  };

  return {
    usersForTable,
    filter,
    clearFilter,
    back,
    next,
    load,
    disableNextPagination,
    disableBackPagination,
    update,
  };
};

export default useUsers;

const checkForCaching = (params: string[], cashParams?: string[]) => {
  const paramForSearch = params.filter((f) => f !== "").sort();

  if (paramForSearch.length > 0 && cashParams) {
    const isCash = compare(paramForSearch, cashParams.sort());
    return { isNeedSearch: !isCash, departmentsInUserInfo: paramForSearch };
  }
  return { isNeedSearch: false, paramForSearch };
};
