import { useState } from "react";
import { QueryConstraint } from "@firebase/firestore";
import { limit, orderBy, startAfter } from "firebase/firestore";
import { UserInfoWithID } from "../../utils/constructUsersForTable";

interface visibleItem {
  first: string;
  last: string;
}

const usePagination = () => {
  const [isLastClickBack, setIsLastClickBack] = useState<boolean>(false);
  const [disableNextPagination, setDisableNextPagination] = useState<boolean>();
  const [disableBackPagination, setDisableBackPagination] = useState<boolean>(true);
  const [visibleItem, setVisibleItem] = useState<visibleItem>();
  const [paginationQueryConstraint, setPaginationQueryConstraint] = useState<QueryConstraint[]>([
    orderBy("fullName"),
  ]);
  const clearPagination = () => {
    setPaginationQueryConstraint([orderBy("fullName")]);
  };

  const backPaginationData = () => {
    setIsLastClickBack(true);
    setDisableNextPagination(false);
    setPaginationQueryConstraint([
      orderBy("fullName", "desc"),
      startAfter(visibleItem?.last),
      limit(6),
    ]);
  };

  const nextPaginationData = () => {
    setIsLastClickBack(false);
    setDisableBackPagination(false);

    setPaginationQueryConstraint([orderBy("fullName"), startAfter(visibleItem?.first)]);
  };
  const setAvailabilityPagination = (users: UserInfoWithID[], isFiltering: boolean) => {
    const usersLength = users.length;
    let isDisableNext;
    let isDisableBack;
    const isDisable = usersLength < 6;
    if (!isFiltering) {
      isDisableBack = isLastClickBack ? isDisable : false;
      isDisableNext = isLastClickBack ? false : isDisable;
      updateLastAndFirstVisible(users, isDisableBack, isDisableNext, isLastClickBack);
    } else {
      clearPagination();
      isDisableBack = true;
      isDisableNext = isDisable;
      setIsLastClickBack(false);
      updateLastAndFirstVisible(users, isDisableBack, isDisableNext, false);
    }
  };

  const updateLastAndFirstVisible = (
    users: UserInfoWithID[],
    disableBackPagination: boolean,
    disableNextPagination: boolean,
    isLastClickBack: boolean
  ) => {
    setDisableBackPagination(disableBackPagination);
    setDisableNextPagination(disableNextPagination);
    if (isLastClickBack) {
      users.reverse();
    }
    const lastVisible = disableBackPagination
      ? undefined
      : isLastClickBack
      ? users.length > 5
        ? users[1]
        : users[0]
      : users[0];
    const firstVisible = disableNextPagination
      ? undefined
      : isLastClickBack
      ? users[users.length - 1]
      : users[users.length - 2];
    setVisibleItem({
      first: firstVisible ? firstVisible.fullName : "",
      last: lastVisible ? lastVisible.fullName : "",
    });
  };

  return {
    paginationQueryConstraint,
    clearPagination,
    nextPaginationData,
    backPaginationData,
    isLastClickBack,
    disableNextPagination,
    disableBackPagination,
    setAvailabilityPagination,
  };
};
export default usePagination;
