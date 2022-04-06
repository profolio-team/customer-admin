import MaterialTable from "material-table";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../services/firebase";
import { companyName } from "../../utils/url.utils";
import { UserInfo } from "../../../../typescript-types/db.types";

export function UsersPage() {
  const navigate = useNavigate();
  const [users] = useCollection(collection(firestore, `companies/${companyName}/users`), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  users ? console.log(users.docs) : console.log("wait");
  const data: UserInfo[] = [];
  users
    ? users?.docs.map((e) => {
        data.push(e.data());
      })
    : console.log("wait");

  return (
    <Container>
      <Button onClick={() => navigate("create")}>Create New User</Button>
      <MaterialTable columns={[{ title: "email", field: "email" }]} data={data} />
    </Container>
  );
}
