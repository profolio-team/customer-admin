import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#6A7178",
  borderBottom: "1px solid #F3F6F8",
}));

export function Divider(): JSX.Element {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Item></Item>
      </Grid>
    </Grid>
  );
}
