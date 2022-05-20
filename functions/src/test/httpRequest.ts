import * as functions from "firebase-functions";

export const testHttpRequest = functions.https.onRequest(async (req, res) => {
  res.send({ message: "Test message" });
});
