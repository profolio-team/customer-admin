import { where } from "firebase/firestore";
import { QueryConstraint } from "@firebase/firestore";

export const createWhereForStringSearch = (fieldName: string, findString: string) => {
  if (findString === "") {
    return [where(fieldName, ">=", "A"), where(fieldName, "<=", "Z")];
  }
  return [where(fieldName, ">=", findString), where(fieldName, "<=", `${findString}~`)];
};

export const toUpperFirstChar = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const createQueryConstraint = (name: string): QueryConstraint[] => {
  const fullName = toUpperFirstChar(name.trim()).split(" ");
  if (fullName.length > 1) {
    const firsName = fullName[0];
    const lastName = toUpperFirstChar(fullName[1]);
    return [
      ...createWhereForStringSearch("lastName", lastName),
      where("firstName", "==", firsName),
    ];
  }
  return [...createWhereForStringSearch("firstName", fullName[0])];
};
