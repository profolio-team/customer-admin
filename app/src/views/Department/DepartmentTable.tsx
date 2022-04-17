import { Button, Container, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import MaterialTable, { Column } from "material-table";
import { useNavigate } from "react-router-dom";
import db, { dataPointDocument } from "../../services/firebase/firestore";
import { companyName } from "../../utils/url.utils";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { UserInfoWithId } from "../Users/AllUsers";
import { DepartmentInfoTable } from "../params/CheckParams";
import CircularProgress from "@mui/material/CircularProgress";

interface departmentTableProps {
  departments: DepartmentInfoTable[];
}

export function DepartmentTable({ departments }: departmentTableProps) {
  const navigate = useNavigate();
  const columns: Column<DepartmentInfoTable>[] = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Head",
      field: "headName",
    },
    {
      title: "current",
      field: "current",
      render: (rowData) => rowData.current || <CircularProgress size={"20px"} />,
    },
    {
      title: "",
      field: "id",
      render: (rowData) =>
        rowData && (
          <>
            <IconButton onClick={() => navigate(`/department/${rowData.id}/invites`)}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/department/${rowData.id}/changes`)}>
              <CreateIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                deleteDoc(dataPointDocument(`companies/${companyName}/departments/${rowData.id}`))
              }
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
    },
    {
      field: "headID",
      hidden: true,
    },
  ];
  return (
    <>
      <Button variant="contained" onClick={() => navigate("/department/create")}>
        Create Department
      </Button>
      <MaterialTable title={"Users"} columns={columns} data={departments} />
    </>
  );
}

export function Department({ id, users }: { id: string; users: UserInfoWithId[] }) {
  const columns: Column<UserInfoWithId>[] = [
    {
      field: "email",
      hidden: true,
    },
    {
      field: "firstName",
      hidden: true,
    },
    {
      field: "lastName",
      hidden: true,
    },
    {
      title: "name",
      render: (rowData) =>
        rowData && (
          <>
            <p>
              {rowData.firstName} {rowData.lastName}
            </p>
            <p>{rowData.email}</p>
          </>
        ),
    },
    {
      field: "grade",
      hidden: true,
    },
    {
      field: "job",
      hidden: true,
    },
    {
      title: "Job Title",
      render: (rowData) =>
        rowData && (
          <>
            <p>{rowData.job}</p>
            <p>{rowData.grade}</p>
          </>
        ),
    },
    {
      title: "Location",
      field: "location",
    },
    {
      title: "System Role",
      field: "role",
    },
    {
      field: "departmentName",
      hidden: true,
    },
    {
      field: "headName",
      hidden: true,
    },
    {
      title: "Department",
      render: (rowData) =>
        rowData && (
          <>
            <p>{rowData.departmentName}</p>
            <p>{rowData.headName}</p>
          </>
        ),
    },
    { field: "departmentID", hidden: true },
    { field: "id", hidden: true },
  ];

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 0" }}>
      <Stack direction={"row"} sx={{ padding: "2rem 0" }} justifyContent={"space-between"}>
        <Typography variant="h2" component="h2">
          Add users to department
        </Typography>
      </Stack>
      <MaterialTable
        options={{
          selection: true,
        }}
        title={"Users"}
        columns={columns}
        data={users}
        actions={[
          {
            tooltip: "Add All Selected Users to Department",
            icon: "add",
            onClick: (evt, data) => {
              if (Array.isArray(data)) {
                data.map((e) =>
                  addUserToDepartment({
                    id: e.id,
                    departmentID: id,
                  })
                );
              } else {
                addUserToDepartment({
                  id: data.id,
                  departmentID: id,
                });
              }
            },
          },
        ]}
      />
    </Container>
  );
}

export function addUserToDepartment({ id, departmentID }: { id: string; departmentID: string }) {
  updateDoc(doc(db.adminUserInfos, id), { departmentID: departmentID });
}
