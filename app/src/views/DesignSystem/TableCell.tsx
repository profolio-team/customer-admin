import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#6A7178",
  textAlign: "left",
  borderRadius: "0",
  padding: ".75rem 0 .75rem 1rem",
  fontSize: "caption",
}));

export function TableCell(): JSX.Element {
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <Item elevation={0}>Content</Item>
      </Grid>
      <Grid item xs={2}>
        <Item elevation={0}>Content</Item>
      </Grid>
      <Grid item xs={2}>
        <Item elevation={0}>Content</Item>
      </Grid>
      <Grid item xs={1}>
        <Item elevation={0}>Content</Item>
      </Grid>
      <Grid item xs={2}>
        <Item elevation={0}>Content</Item>
      </Grid>
      <Grid item xs={2}>
        <Item elevation={0}>Content</Item>
      </Grid>
    </Grid>
  );
}
