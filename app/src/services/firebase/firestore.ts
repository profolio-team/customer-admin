import { firestore } from "./index";
import {
  CorporateUserInfo,
  CompanyInfo,
  DepartmentInfo,
  UserInfo,
} from "../../../../typescript-types/db.types";
import { SnapshotOptions } from "@firebase/firestore-types";
import FirebaseFirestore from "@google-cloud/firestore";
import { collection, doc } from "firebase/firestore";
import { companyName } from "../../utils/url.utils";

interface FirestoreDataConverter<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(model: T): any;

  fromFirestore(snapshot: unknown, options?: SnapshotOptions): T;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as T,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const dataPointCollection = <T>(collectionPath: string) =>
  // eslint-disable-next-line
  collection(firestore, collectionPath).withConverter(converter<T>() as FirestoreDataConverter<T>);
export const dataPointDocument = <T>(documentPath: string) =>
  // eslint-disable-next-line
  doc(firestore, documentPath).withConverter(converter<T>() as FirestoreDataConverter<T>);
const db = {
  departments: dataPointCollection<DepartmentInfo>(`companies/${companyName}/departments`),
  config: dataPointCollection<CompanyInfo>(`companies/${companyName}/config`),
  users: dataPointCollection<UserInfo>(`companies/${companyName}/users`),
  adminUserInfos: dataPointCollection<CorporateUserInfo>(`companies/${companyName}/users`),
  us: dataPointCollection(`companies/${companyName}/departments/Jce0VJIjWrWBt3Fv6E5g/users`),
};

export default db;
