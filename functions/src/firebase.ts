import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const db = admin.firestore();
const logger = functions.logger;
const config = functions.config();

const firebaseFunctions = functions.region("us-central1");

export default admin;
export { db, logger, config, admin, firebaseFunctions };
