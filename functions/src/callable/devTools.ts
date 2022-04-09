import * as functions from "firebase-functions";

import { CompanyInfo, CustomClaims, UserInfo } from "../../../typescript-types/db.types";
import { db, admin } from "../firebase";
import { setCompanyInfo } from "./company";
import { createUserWithClaims, setUserInfo } from "./user";

export interface ResetDatabaseResponce {
  result: string;
  error: string;
}

async function clearCollection(collectionPath: string) {
  const citiesRef = db.collection(collectionPath);
  const snapshot = await citiesRef.get();
  const docs: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] = [];
  snapshot.forEach((doc) => docs.push(doc));

  const resultOfDelete = docs.map(async (doc) => {
    const sfRef = db.collection(collectionPath).doc(doc.id);
    const collections = await sfRef.listCollections();

    const collectionsArray: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>[] =
      [];
    collections.forEach((collection) => collectionsArray.push(collection));

    const deleteSubCollections = collectionsArray.map(async (collection) => {
      console.log(`${collectionPath}/${doc.id}/${collection.id}`);
      await clearCollection(`${collectionPath}/${doc.id}/${collection.id}`);
    });

    await Promise.all(deleteSubCollections);
    await db.collection(collectionPath).doc(doc.id).delete();
  });

  return Promise.all(resultOfDelete);
}

async function clearUsers() {
  const listUsers = await admin.auth().listUsers();

  listUsers.users.forEach(async (user) => {
    await admin.auth().deleteUser(user.uid);
  });
}

export const resetDatabase = functions.https.onCall(async (): Promise<ResetDatabaseResponce> => {
  try {
    await clearUsers();
    await clearCollection("companies");
    await clearCollection("companyVerification");

    return {
      result: "ok",
      error: "",
    };
  } catch (e) {
    return {
      result: "",
      error: JSON.stringify(e),
    };
  }
});

const generateUsersByProps = async (
  count: number,
  prefix: string,
  domain: string,
  isAdmin: boolean,
  isOwner: boolean,
  password: string
) => {
  for (let i = 0; i < count; i++) {
    const email = `${prefix}${i ? i : ""}@${domain}.com`;
    const claims: CustomClaims = {
      domain,
    };
    if (isAdmin) {
      claims.isAdmin = isAdmin;
    }

    if (isOwner) {
      claims.isOwner = isOwner;
    }

    const userInfo: UserInfo = {
      firstName: `First`,
      lastName: `Last${i}${domain}`,
      linkedInUrl: `http://linkedIn.com/url${i}${email}`,
      about: `about ${i} about`,
      phone: `+37544${i}${i}${i}${i}${i}${i}${i}`,
      email,
    };
    const user = await createUserWithClaims({ claims, email, password });
    await setUserInfo({ uid: user.uid, domain, userInfo });
  }
};

const createUsers = async (domain: string, password: string) => {
  await generateUsersByProps(10, "user", domain, false, false, password);
  await generateUsersByProps(10, "admin", domain, true, false, password);
  await generateUsersByProps(10, "owner", domain, false, true, password);

  await generateUsersByProps(1, "owneradmin", domain, true, true, password);
  await generateUsersByProps(1, "adminowner", domain, true, true, password);
};

const createCompany = async ({ domain, password }: GenerateUsersRequest) => {
  await createUsers(domain, password);

  const companyInfo: CompanyInfo = {
    name: "Examplus",
    email: `owner@${domain}`,
    logoUrl: "",
    about: "",
    phone: "",
    template: "",
  };

  await setCompanyInfo({ domain, companyInfo, isVeified: true });
};

export interface GenerateUsersResponce {
  result: string;
  error: string;
}

export interface GenerateUsersRequest {
  password: string;
  domain: string;
}

export const generateUsers = functions.https.onCall(
  async ({ password, domain }: GenerateUsersRequest, context): Promise<GenerateUsersResponce> => {
    try {
      await clearUsers();
      await createCompany({ password, domain });
      return {
        result: "ok",
        error: "",
      };
    } catch (e) {
      return {
        result: "ok",
        error: "failed",
      };
    }
  }
);
