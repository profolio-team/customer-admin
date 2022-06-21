import { firestore } from "./index";
import { CompanyInfo, UserInfo, UserParams } from '../../../../typescript-types/db.types';
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

export const dataPointCollection = <T>(collectionPath: string) =>
    // eslint-disable-next-line
    collection(firestore, collectionPath).withConverter(converter<T>() as FirestoreDataConverter<T>);

export const dataPointDoc = <T>(documentPath: string) =>
    // eslint-disable-next-line
    doc(firestore, documentPath).withConverter(converter<T>() as FirestoreDataConverter<T>);
const db = {
  collections: {
    users: dataPointCollection<UserInfo>(`companies/${companyName}/users`),
  },
  documents: {
    config: {
      companyInfo: dataPointDoc<CompanyInfo>(`companies/${companyName}/config/companyInfo`),
      userParams: dataPointDoc<UserParams>(`companies/${companyName}/config/userParams`),
    }
  }
};

export default db;
