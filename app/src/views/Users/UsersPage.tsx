import MaterialTable from "material-table";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";

export function UsersPage() {
  const navigate = useNavigate();
  const [users] = useCollection(db.users);
  const data: UserInfo[] = [];

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
