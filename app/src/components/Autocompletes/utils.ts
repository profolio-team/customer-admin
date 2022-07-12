import { where } from "firebase/firestore";

export const createWhereForStringSearch = (fieldName: string, findString: string) => {
  if (findString === "") {
    return [where(fieldName, ">=", "A"), where(fieldName, "<=", "Z")];
  }
  return [where(fieldName, ">=", findString), where(fieldName, "<=", `${findString}~`)];
};

export const toUpperFirstChar = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
