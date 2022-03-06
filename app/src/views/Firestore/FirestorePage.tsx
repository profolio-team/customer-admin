import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { auth } from "../../services/firebase";
import { testDataTypeWithAllTypes } from "../../../../typescript-types/db.types";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useState } from "react";
import { signOut } from "firebase/auth";

// Example of Auth process
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Registered User: {user.user.email}</p>
      </div>
    );
  }
  return (
    <div className="App">
      <h2>SignUp</h2>
      <input
        type="email"
        autoComplete="true"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => createUserWithEmailAndPassword(email, password)}>Register</button>
      <hr />
      <div>
        <p>{error?.message && `Error: ${error?.message}`}</p>
      </div>
    </div>
  );
};

// Example of Auth process
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.user.email}</p>
      </div>
    );
  }
  return (
    <div className="App">
      <h2>SignIn</h2>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => signInWithEmailAndPassword(email, password)}>Sign In</button>
      <hr />
      <div>
        <p>{error?.message && `Error: ${error?.message}`}</p>
      </div>
    </div>
  );
};

export function FirestorePage(): JSX.Element {
  // Example of read data
  const [testList, loading, error] = useCollectionData<testDataTypeWithAllTypes>(db.testDataTypeWithAllTypes);
  const listData = testList || [];
  console.log("testList, loading, error");
  console.log(testList, loading, error);

  const pushNewHandler = async () => {
    const testData: testDataTypeWithAllTypes = {
      stringExample: `${Math.round(Math.random() * 1000)} Hello world! ${Date.now()}`,
      booleanExample: true,
      numberExample: Math.random() * 10000,
      arrayExample: ["hello", "Lol"],
      nullExample: null,
      objectExample: {
        a: "5",
      },
    };
    // Example of write data
    const docRef = await addDoc(db.testDataTypeWithAllTypes, testData);
    console.log("result after addDoc", docRef);
  };

  const deleteHandler = async () => {
    if (!testList || testList?.length == 0) {
      return;
    }

    // Example of delete data
    // But.. don't use it. It's ugly. Need refactorinf
    const q = query(db.testDataTypeWithAllTypes, where("stringExample", "==", testList[0].stringExample));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("after delete ", doc.id);
    });
  };

  // Example of getting user info (is user logged in or not)
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  console.log(`------------------`);
  console.log("user", user, loadingAuth, errorAuth);
  console.log(`------------------`);

  const LogoutHandler = async () => {
    await signOut(auth);
    console.log("Logout");
  };

  return (
    <div className="page-content page-content__design-system">
      <h2>Firestore play ground</h2>
      <Stack spacing={3} direction={"row"}>
        <Button variant="contained" onClick={pushNewHandler}>
          Push data
        </Button>
        <Button variant="contained" onClick={deleteHandler}>
          delete one
        </Button>

        <Button variant="contained" onClick={LogoutHandler}>
          Logout
        </Button>
      </Stack>
      <hr />
      <h2>List of data. Sync = on</h2>
      {listData.map((cityData) => (
        <p key={cityData.stringExample}>{cityData.stringExample}</p>
      ))}
      <hr />
      <Stack spacing={3} direction={"column"}>
        <p>
          <b>User email:</b> {user?.email}
        </p>
        <p>
          <b>User Id:</b> {user?.uid}
        </p>
        <Button variant="contained" onClick={LogoutHandler}>
          Logout
        </Button>
      </Stack>
      <hr />
      <SignUp />
      <SignIn />
    </div>
  );
}
