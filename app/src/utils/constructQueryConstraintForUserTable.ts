import { QueryConstraint } from "@firebase/firestore";
import { where } from "firebase/firestore";
import { UserInfo } from "../../../typescript-types/db.types";

export function constructQueryConstraint(data: UserInfo): QueryConstraint[] {
  const dataForFiltering = Object.entries(data).filter(
    (p) => p[0] !== "name" && (typeof p[1] === "string" || typeof p[1] === "boolean")
  );
  const wheres = dataForFiltering.map((data) => where(data[0], "==", data[1]));
  return wheres;
}
