import * as functions from "firebase-functions";
import { db } from "./firebase";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Hello logs!2", { structuredData: true });

  await db.collection("firstcollection").doc("doooc").set({
    aaaa: "bbbbb",
  });
  response.send("Hello from Firebase!");
});

export const handleUserCreate = functions.auth.user().onCreate(async (user, context) => {
  await db.collection('users').doc(user.uid).create({});
})
