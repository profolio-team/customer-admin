import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCSz0tesRU2ZCgV1Zx6nPEZs58LU7ato1Q",
  authDomain: "dev-profolio.firebaseapp.com",
  databaseURL: "https://dev-profolio-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dev-profolio",
  storageBucket: "dev-profolio.appspot.com",
  messagingSenderId: "310851445929",
  appId: "1:310851445929:web:810ce8caed0a54edeaf5b8",
  measurementId: "G-25XJEE5QH4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const googleAuthProvider = new GoogleAuthProvider();
const init = () => {
  const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
      a: 5,
      b: {
        nested: "foo",
      },
    },
  };
  setDoc(doc(db, "cities", "new-city-id"), docData);
};

const getData = async () => {
  const docRef = doc(db, "cities", "new-city-id");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export { auth, getData, init, db, analytics, googleAuthProvider, storage, functions };
