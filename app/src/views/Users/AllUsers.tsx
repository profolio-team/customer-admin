import MaterialTable, { Column } from "material-table";
import { Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CorporateUserInfo } from "../../../../typescript-types/db.types";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

export interface FullUserInfo extends CorporateUserInfo {
  id: string;
  departmentName: string;
  headName: string;
}

export function AllUsers({ users }: { users: FullUserInfo[] }) {
  const navigate = useNavigate();
  const columns: Column<FullUserInfo>[] = [
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
            <Typography>
              {rowData.firstName} {rowData.lastName}
            </Typography>
            <Typography color={"var(--color-neutral-7)"}>{rowData.email}</Typography>
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
            <Typography>{rowData.job}</Typography>
            <Typography color={"var(--color-neutral-7)"}>{rowData.grade}</Typography>
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
    {
      render: (rowData) =>
        rowData && (
          <>
            <IconButton onClick={() => navigate(`/user/${rowData.id}`)}>
              <CreateIcon />
            </IconButton>
            <IconButton onClick={() => console.log("delete " + rowData)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 0" }}>
      <Stack direction={"row"} sx={{ padding: "2rem 0" }} justifyContent={"space-between"}>
        <Typography variant="h2" component="h2">
          Users
        </Typography>
        <Button variant="contained" onClick={() => navigate("/user/create")}>
          Create New User
        </Button>
      </Stack>
      <MaterialTable title={"Users"} columns={columns} data={users} />
    </Container>
  );
}
