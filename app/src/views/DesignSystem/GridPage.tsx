import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { TableHeader } from "./TableHeader";
import Paper from "@mui/material/Paper";
import { Divider } from "./Divider";
import { TableCell } from "./TableCell";

const Table = styled(Paper)(({ theme }) => ({
  padding: "0 3rem 0 3rem   ",
  backgroundColor: "transparent",
  marginTop: "3rem",
}));

export function GridPage(): JSX.Element {
  return (
    <Table>
      <TableHeader />
      <Divider />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
    </Table>
  );
}
