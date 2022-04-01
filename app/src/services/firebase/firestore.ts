import { firestore } from "./index";
import {
  testDataTypeWithAllTypes,
  UserInfoDB,
  CompanyVerificationDB,
} from "../../../../typescript-types/db.types";
import { SnapshotOptions } from "@firebase/firestore-types";
import FirebaseFirestore from "@google-cloud/firestore";
import { collection } from "firebase/firestore";

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
const dataPoint = <T>(collectionPath: string) =>
  // eslint-disable-next-line
  collection(firestore, collectionPath).withConverter(converter<T>() as FirestoreDataConverter<T>);

const db = {
  users: dataPoint<UserInfoDB>("users"),
  companyVerification: dataPoint<CompanyVerificationDB>("companyVerification"),
  testDataTypeWithAllTypes: dataPoint<testDataTypeWithAllTypes>("testDataTypeWithAllTypes"),
};

export default db;
