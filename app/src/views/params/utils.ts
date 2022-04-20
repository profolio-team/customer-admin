import { FullUserInfo } from "../Users/AllUsers";
import { QuerySnapshot } from "@firebase/firestore-types";
import { CorporateUserInfo, DepartmentInfo } from "../../../../typescript-types/db.types";

export const currentUsersInDepartments = (users: FullUserInfo[]) => {
  return users
    .map((u) => u.departmentID)
    .reduce((acc: Record<string, number>, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
};

export const departmentsNamesAndHeadsNames = (
  departmentsCollections: QuerySnapshot<DepartmentInfo>,
  usersCollection: QuerySnapshot<CorporateUserInfo>
) => {
  return new Map(
    departmentsCollections.docs.map((doc) => {
      const headName = usersCollection.docs.find((e) => e.id === doc.data().head);
      return [
        doc.id,
        {
          name: doc.data().name,
          fullNameHead: headName
            ? `${headName.data().firstName} ${headName.data().lastName}`
            : "Error: Head not find",
        },
      ];
    })
  );
};
