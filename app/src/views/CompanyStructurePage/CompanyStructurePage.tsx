import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MaterialTable from "material-table";
import { useCollection } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";
// import { query, where, getDocs } from "firebase/firestore";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { doc, deleteDoc, updateDoc } from "firebase/firestore";

interface DepartmentColumn {
  title: string;
  field: string;
}

interface DepartmentTable {
  id: string;
  name: string;
  headId: string;
  count: number;
}

interface UsersData {
  id: string;
  data: UserInfo;
}

export function CompanyStructurePage() {
  const navigate = useNavigate();
  const [departmentsCollection] = useCollection(db.collections.departments);
  const [usersCollection] = useCollection(db.collections.users);

  if (!departmentsCollection) {
    return <Loader />;
  }

  if (!usersCollection) {
    return <Loader />;
  }

  const tableData: DepartmentTable[] = [];

  const departments = departmentsCollection.docs.map((depDoc) => ({
    id: depDoc.id,
    data: depDoc.data(),
  }));
  const users: UsersData[] = usersCollection.docs.map((usersDoc) => ({
    id: usersDoc.id,
    data: usersDoc.data(),
  }));

  departments.forEach((el) => {
    const findEE = users.find((i) => i.id === el.data.headId);
    const head = findEE ? findEE?.data.fullName : "-";
    const count = users.filter((value) => value.data.departmentId === el.id).length;

    tableData.push({ id: el.id, name: el.data.name, headId: head, count: count });
  });

  const columns: DepartmentColumn[] = [
    { title: "Department", field: "name" },
    { title: "Head of department", field: "headId" },
    { title: "Number of employees", field: "count" },
  ];

  // const deliteDepartment = async (data: string) => {
  //   await deleteDoc(doc(db.collections.departments, data.id));

  //   const q = query(db.users, where("departmentId", "==", data.id));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     updateUsersDepartmentInfo(doc.id);
  //   });
  // };
  // const updateUsersDepartmentInfo = async (userId: string) => {
  //   await updateDoc(doc(db.users, userId), {
  //     departmentId: "",
  //   });
  // };

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 0" }}>
      <Stack direction={"row"} sx={{ padding: "2rem 0" }} justifyContent={"space-between"}>
        <Typography variant="h2" component="h2">
          Company structure
        </Typography>
        <Button variant="contained" onClick={() => navigate("create")}>
          Create New Department
        </Button>
      </Stack>

      <MaterialTable
        title={"Department"}
        columns={columns}
        data={tableData}
        options={{ actionsColumnIndex: -1 }}
        actions={[
          {
            icon: GroupsIcon,
            tooltip: "Edit department team",
            onClick: () => alert("Edit department team"),
          },
          {
            icon: EditIcon,
            tooltip: "Edit department details",
            onClick: () => {
              alert("Edit department details");
            },
          },
          {
            icon: DeleteIcon,
            tooltip: "Delete department",
            onClick: () => {
              if (confirm("You want to delete?")) {
                alert("Departnetn has been removed");
                //  deliteDepartment(rowData);
              }
            },
          },
        ]}
      />
    </Container>
  );
}
