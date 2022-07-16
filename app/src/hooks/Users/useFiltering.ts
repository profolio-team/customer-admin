import { useState } from "react";
import { QueryConstraint } from "@firebase/firestore";

const useFiltering = (clearPagination: () => void) => {
  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>([]);
  const [isFiltering, setIsFiltering] = useState(true);

  const filter = (queries: QueryConstraint[]) => {
    setIsFiltering(true);
    setQueryConstraint(queries);
    clearPagination();
  };
  const clearFilter = () => {
    setIsFiltering(true);
    setQueryConstraint([]);
    clearPagination();
  };
  const itsPagination = () => {
    setIsFiltering(false);
  };
  return {
    isFiltering,
    clearFilter,
    filter,
    queryConstraint,
    itsPagination,
  };
};

export default useFiltering;
