import { QueryConstraint } from "@firebase/firestore";
import { where } from "firebase/firestore";
import { FilteringFields } from "../views/Users/UsersPage";

export function constructQueryConstraint(data: FilteringFields): QueryConstraint[] {
  const name = Object.entries(data).filter((p) => p[0] === "name")[0];
  const filtering = Object.entries(data).filter(
    (p) => p[0] !== "name" && (typeof p[1] === "string" || typeof p[1] === "boolean")
  );
  const wheres = filtering.map((f) => where(f[0], "==", f[1]));
  if (typeof name[1] === "string") {
    const fullName = name[1].split(" ");
    const whereFirst = where("firstName", "==", fullName[0]);
    const whereLast = where("lastName", "==", fullName[1]);
    wheres.push(whereFirst);
    wheres.push(whereLast);
  } else {
    wheres.push(where("firstName", ">=", "A"));
    wheres.push(where("firstName", "<=", "Z"));
  }
  return wheres;
}
