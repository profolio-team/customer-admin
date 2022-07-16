import { useState } from "react";
import { QueryConstraint } from "@firebase/firestore";
import { limit, orderBy, startAfter } from "firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";

const usePagination = () => {
  const [isLastClickBack, setIsLastClickBack] = useState<boolean>(false);
  const [disableNextPagination, setDisableNextPagination] = useState<boolean>();
  const [disableBackPagination, setDisableBackPagination] = useState<boolean>();

  const [paginationQueryConstraint, setPaginationQueryConstraint] = useState<QueryConstraint[]>([
    orderBy("fullName"),
  ]);
  const clearPagination = () => {
    setPaginationQueryConstraint([orderBy("fullName")]);
  };

  const backPaginationData = (users: UserInfo[]) => {
    setIsLastClickBack(true);
    setDisableNextPagination(false);
    const lastVisible = isLastClickBack ? users.reverse()[1] : users[0];
    setPaginationQueryConstraint([
      orderBy("fullName", "desc"),
      startAfter(lastVisible.fullName),
      limit(6),
    ]);
  };

  const nextPaginationData = (users: UserInfo[]) => {
    setIsLastClickBack(false);
    setDisableBackPagination(false);
    const lastVisible = isLastClickBack
      ? users.reverse()[users.length - 1]
      : users[users.length - 2];
    setPaginationQueryConstraint([orderBy("fullName"), startAfter(lastVisible.fullName)]);
  };
  const setAvailabilityPagination = (usersLength: number, isFiltering: boolean) => {
    if (!isFiltering) {
      isLastClickBack
        ? usersLength < 6
          ? setDisableBackPagination(true)
          : setDisableBackPagination(false)
        : usersLength < 6
        ? setDisableNextPagination(true)
        : setDisableNextPagination(false);
    } else {
      setDisableBackPagination(true);
      setDisableNextPagination(false);
      if (usersLength < 6) {
        setDisableBackPagination(true);
        setDisableNextPagination(true);
      }
    }
  };
  return {
    paginationQueryConstraint,
    clearPagination,
    nextPaginationData,
    backPaginationData,
    isLastClickBack,
    setAvailabilityPagination,
    disableNextPagination,
    disableBackPagination,
  };
};
export default usePagination;
