import { db } from "../firebase";

export async function deleteCollection(collectionPath: string): Promise<void> {
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
      await deleteCollection(`${collectionPath}/${doc.id}/${collection.id}`);
    });

    await Promise.all(deleteSubCollections);
    await db.collection(collectionPath).doc(doc.id).delete();
  });

  await Promise.all(resultOfDelete);
}
