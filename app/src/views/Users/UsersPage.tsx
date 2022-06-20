import MaterialTable from "material-table";
import { Button, Container, Stack, Typography } from "@mui/material";
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
    <Container maxWidth="xl" sx={{ padding: "2rem 0" }}>
      <Stack direction={"row"} sx={{ padding: "2rem 0" }} justifyContent={"space-between"}>
        <Typography variant="h2" component="h2">
          Users
        </Typography>
        <Button variant="contained" onClick={() => navigate("invite")}>
          Create New User
        </Button>
      </Stack>

      <MaterialTable title={"Users"} columns={columns} data={users} />
    </Container>
  );
}
