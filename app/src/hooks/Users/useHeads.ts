import { useEffect, useState } from "react";
import { QueryConstraint } from "@firebase/firestore";
import { documentId, limit, query, where } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";

interface head {
  fullName: string;
  headId: string;
}

const useHeads = () => {
  const [heads, setHeads] = useState<head[]>();
  const [headList, setHeadList] = useState<string[]>([]);
  const [findHead, setFindHeads] = useState<QueryConstraint[]>([limit(1)]);
  const [headsCollection, loadingHeadsCollection] = useCollectionOnce(
    query(db.collections.users, ...findHead)
  );

  useEffect(() => {
    if (!loadingHeadsCollection) {
      setHeads(
        headsCollection?.docs.map((d) => {
          return { headId: d.id, fullName: d.data().fullName };
        })
      );
    }
  }, [loadingHeadsCollection]);

  useEffect(() => {
    console.log(2);
    console.log(headList);
    if (headList.filter((f) => f !== "").length !== 0) {
      setFindHeads([where(documentId(), "in", headList)]);
    }
    console.log(3);
  }, [headList]);

  return {
    heads,
    setHeadList,
    loadingHeadsCollection,
  };
};

export default useHeads;
