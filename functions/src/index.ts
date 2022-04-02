import * as functions from "firebase-functions";
import { db } from "./firebase";
import { registerCompany } from "./callable/registration";
import { handleUserCreate } from "./triggers/user";
import { getDomainByEmail } from "./callable/user";

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

export const user = {
  create: handleUserCreate,
  getDomainByEmail,
};

export const registration = {
  registerCompany,
};
