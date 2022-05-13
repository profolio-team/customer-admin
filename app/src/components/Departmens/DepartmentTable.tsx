import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import MaterialTable, { Column } from "material-table";
import { useNavigate } from "react-router-dom";
import { dataPointDocument } from "../../services/firebase/firestore";
import { companyName } from "../../utils/url.utils";
import { deleteDoc } from "firebase/firestore";

import { DepartmentInfoTable } from "../../views/params/CheckParams";
import CircularProgress from "@mui/material/CircularProgress";

interface DepartmentTableProps {
  departments: DepartmentInfoTable[];
}

export function DepartmentTable({ departments }: DepartmentTableProps) {
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
