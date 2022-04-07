import MaterialTable from "material-table";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";

interface UserColumn {
  title: string;
  field: keyof UserInfo;
}

export function UsersPage() {
  const navigate = useNavigate();
  const [usersCollection] = useCollection(db.users);

  if (!usersCollection) {
    return <Loader />;
  }

  const users: UserInfo[] = usersCollection.docs.map((usersDoc) => usersDoc.data());

  const columns: UserColumn[] = [
    { title: "Email", field: "email" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Phone", field: "phone" },
  ];

  return (
    <Container>
      <Button onClick={() => navigate("create")}>Create New User</Button>
      <MaterialTable columns={columns} data={users} />
    </Container>
  );
}
