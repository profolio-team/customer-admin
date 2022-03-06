import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { testDataTypeWithAllTypes } from "../../../../typescript-types/db.types";

export function FirestorePage(): JSX.Element {
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

    const docRef = await addDoc(db.testDataTypeWithAllTypes, testData);
    console.log("result after addDoc", docRef);
  };

  const deleteHandler = async () => {
    if (!testList || testList?.length == 0) {
      return;
    }
    const q = query(db.testDataTypeWithAllTypes, where("stringExample", "==", testList[0].stringExample));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("after delete ", doc.id);
    });
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
      </Stack>
      <hr />
      <h2>List of data. Sync = on</h2>
      {listData.map((cityData) => (
        <p key={cityData.stringExample}>{cityData.stringExample}</p>
      ))}
    </div>
  );
}
