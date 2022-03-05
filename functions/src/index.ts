import * as functions from "firebase-functions";
import { db } from "./firebase";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  await db.collection("firstcollection").doc("doooc").set({
    aaaa: "bbbbb",
  });
  response.send("Hello from Firebase!");
});
