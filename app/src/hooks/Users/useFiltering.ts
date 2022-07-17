import { useState } from "react";
import { QueryConstraint } from "@firebase/firestore";

const useFiltering = () => {
  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>([]);
  const [isFiltering, setIsFiltering] = useState(true);

  const filter = (queries: QueryConstraint[]) => {
    setIsFiltering(true);
    setQueryConstraint(queries);
  };
  const clearFilter = () => {
    setIsFiltering(true);
    setQueryConstraint([]);
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
