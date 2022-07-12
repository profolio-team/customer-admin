import { query, where, getDocs } from "firebase/firestore";
import db from "../services/firebase/firestore";

export async function checkDbMatch(area: string, inputValue: string) {
  const nameQuery = query(db.collections.departments, where(area, "==", inputValue));
  const querySnapshot = await getDocs(nameQuery);

  return querySnapshot.docs.length;
}
