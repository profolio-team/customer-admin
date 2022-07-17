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

const useUsers = (limits: number) => {
  const [loading, setLoading] = useState(true);
  console.log(loading);
  const [usersForTable, setUsersForTable] = useState<UsersTable[]>();

  const {
    paginationQueryConstraint,
    nextPaginationData,
    backPaginationData,
    setAvailabilityPagination,
    isLastClickBack,
    disableNextPagination,
    disableBackPagination,
  } = usePagination();

  const { queryConstraint, isFiltering, clearFilter, filter, itsPagination } = useFiltering();

  const { updateDepartmentList, departments, loadingDepartments, itsUpdate } = useDepartments();

  const [usersCollection, loadingUsersCollections] = useCollection(
    query(db.collections.users, ...queryConstraint, ...paginationQueryConstraint, limit(limits)),
    { snapshotListenOptions: { includeMetadataChanges: false } }
  );

  const update = async (props: ChangeUserCorporateInfoProps) => {
    await changeUserCorporateInfo(props);
  };

  useEffect(() => {
    console.log("setLoad");
    setLoading(true);
    if (!loadingUsersCollections && usersCollection) {
      console.log("Прошел через if в useEffect [usersCollection]");
      const departmentsUser = usersCollection.docs.map((d) => d.data().departmentId);
      updateDepartmentList(departmentsUser);
    }
  }, [usersCollection]);

  useEffect(() => {
    if (usersCollection && !loadingDepartments) {
      construct();
    }
  }, [itsUpdate]);

  const back = () => {
    itsPagination();
    backPaginationData();
  };
  const next = () => {
    itsPagination();
    nextPaginationData();
  };

  const construct = () => {
    if (!usersCollection) {
      return;
    }
    const users = usersCollection.docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
    setAvailabilityPagination(users, isFiltering);
    const usersWithDepartment = constructUsersForTable(
      users,
      departments,
      isLastClickBack,
      isFiltering
    );
    setUsersForTable(usersWithDepartment);
    console.log("setEndLoad");
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
