import MaterialTable from "material-table";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../services/firebase";
import { companyName } from "../../utils/url.utils";
import { DocumentData } from "@firebase/firestore-types";
import { Loader } from "../../components";

export function UsersPage() {
  const navigate = useNavigate();
  const [users] = useCollection(collection(firestore, `companies/${companyName}/users`), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const data: DocumentData[] = [];

  if (!users) {
    return <Loader />;
  }
  users.docs.map((user) => {
    data.push(user.data());
  });
  return (
    <Container>
      <Button onClick={() => navigate("create")}>Create New User</Button>
      <MaterialTable columns={[{ title: "email", field: "email" }]} data={data} />
    </Container>
  );
}
