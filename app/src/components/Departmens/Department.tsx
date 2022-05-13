import { Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import db, { dataPointDocument } from "../../services/firebase/firestore";

import MaterialTable, { Column } from "material-table";

import { FullUserInfo } from "../../views/Users/AllUsers";

export function Department({ id, users }: { id: string; users: FullUserInfo[] }) {
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
            <>
              <Typography>
                {rowData.firstName} {rowData.lastName}
              </Typography>
              <Typography color={"var(--color-neutral-7)"}>{rowData.email}</Typography>
            </>
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
            <Typography>{rowData.departmentName}</Typography>
            <Typography color={"var(--color-neutral-7)"}>{rowData.headName}</Typography>
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
