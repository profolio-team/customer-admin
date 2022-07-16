import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { limit, query } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { UsersTable } from "../../views/Users/ColumnForUsersTable";
import { constructUsersForTable } from "../../utils/constructUsersForTable";
import {
  changeUserCorporateInfo,
  ChangeUserCorporateInfoProps,
} from "../../utils/requests/updateUserCorporateInfo";
import usePagination from "./usePagination";
import useFiltering from "./useFiltering";
import useDepartments from "./useDepartments";

export function compare(a1: Array<string>, a2: Array<string>) {
  return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
}

const useUsers = (limits: number) => {
  const [loading, setLoading] = useState(true);

  const [usersForTable, setUsersForTable] = useState<UsersTable[]>();

  const [isUpdate, setIsUpdate] = useState(false);

  const [firstLoad, setFirstLoad] = useState(true);

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

  const { queryConstraint, isFiltering, clearFilter, filter, itsPagination } =
    useFiltering(clearPagination);

  const { updateDepartmentList, departments, loadingDepartments, itsUpdate } = useDepartments();

  const [usersCollection, loadingUsersCollections] = useCollection(
    query(db.collections.users, ...queryConstraint, ...paginationQueryConstraint, limit(limits)),
    { snapshotListenOptions: { includeMetadataChanges: false } }
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

  useEffect(() => {
    console.log(1);
    console.log(loadingUsersCollections);
    setLoading(true);
    if (!loadingUsersCollections && usersCollection) {
      setAvailabilityPagination(usersCollection.docs.length, isFiltering);
      const departmentsUser = usersCollection.docs.map((d) => d.data().departmentId);

      updateDepartmentList(departmentsUser);
    }
  }, [usersCollection]);

  useEffect(() => {
    if (usersCollection && !loadingDepartments && !firstLoad) {
      construct();
    }
    console.log(firstLoad);
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [itsUpdate]);

  const back = () => {
    const users = getUsers();
    if (!users) {
      return;
    }
    itsPagination();
    backPaginationData(users);
  };
  const next = () => {
    const users = getUsers();
    if (!users) {
      return;
    }
    itsPagination();
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
      departments
    );
    setUsersForTable(
      isLastClickBack
        ? users.length === 5
          ? users.reverse()
          : users.reverse().slice(1, 6)
        : users.slice(0, 5)
    );
    setLoading(false);
  };

  return {
    usersForTable,
    filter,
    clearFilter,
    back,
    next,
    load: loading,
    disableNextPagination,
    disableBackPagination,
    update,
  };
};

export default useUsers;
