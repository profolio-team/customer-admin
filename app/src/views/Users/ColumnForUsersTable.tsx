import { IconButton, Typography } from "@mui/material";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import CreateIcon from "@mui/icons-material/Create";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { UserInfo } from "../../../../typescript-types/db.types";
import { Column } from "material-table";

export function ColumnForUsersTable(): Column<UserInfo>[] {
  return [
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
      title: "Full name",
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
      title: "Job title",
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
      title: "System role",
      field: "role",
    },
    //TODO: Department
    // {
    //     field: "departmentName",
    //     hidden: true,
    // },
    // {
    //     field: "headName",
    //     hidden: true,
    // },
    // {
    //     title: "Department",
    //     render: (rowData) =>
    //         rowData && (
    //             <>
    //                 <Typography>{rowData.departmentName}</Typography>
    //                 <Typography color={"var(--color-neutral-7)"}>{rowData.headName}</Typography>
    //             </>
    //         ),
    // },
    // { field: "departmentID", hidden: true },
    { field: "id", hidden: true },
    {
      title: "Status",
      field: "isActive",
      render: (rowData) => {
        const color = rowData.isActive ? "green" : "red";
        return (
          rowData && (
            <Typography>
              <Brightness1RoundedIcon
                sx={{
                  color: color,
                  fontSize: "12px",
                  marginRight: "14px",
                }}
              />
              {rowData.isActive ? "Active" : "Inactive"}
            </Typography>
          )
        );
      },
    },
    {
      render: (rowData) =>
        rowData && (
          <>
            <IconButton
            //TODO: relocate
            // onClick={() => navigate(`/user/${rowData.id}`)}
            >
              <CreateIcon />
            </IconButton>
            <IconButton
            //TODO: change status
            // onClick={() =>
            //     updateDoc(doc(db.adminUserInfos, rowData.id), { isActive: !rowData.isActive })
            // }
            >
              {rowData.isActive ? (
                <RemoveCircleOutlineOutlinedIcon />
              ) : (
                <AddCircleOutlineOutlinedIcon />
              )}
            </IconButton>
          </>
        ),
    },
  ];
}
