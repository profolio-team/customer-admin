import * as functions from "firebase-functions";
import admin, { db } from "../firebase";

const createDefaultCollections = (
  companyCollection: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
) => {
  companyCollection.collection("config").doc("CompanyInfo").set({
    name: "",
    email: "",
    logoUrl: "",
    about: "",
    phone: "",
    template: "",
  });
};
export const handleUserCreate = functions.auth.user().onCreate(async (user) => {
  let isAdmin = false;
  let domain = "";
  let isOwner = false;

  if (user.email) {
    const data = await db.collection("companyVerification").doc(user.email.toLowerCase()).get();
    const companyVerificationData = data.data();
    domain = companyVerificationData?.domain || "";
    isAdmin = !!companyVerificationData;
    isOwner = !!companyVerificationData;
  }

  if (domain) {
    const companyCollection = db.collection("companies").doc(domain);
    if (isOwner) {
      createDefaultCollections(companyCollection);
    }
    companyCollection.collection("users").doc(user.uid).create({});
  }

  await admin.auth().setCustomUserClaims(user.uid, {
    domain,
    isAdmin,
  });
});
