import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

export function Loader() {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", margin: "25% auto" }}>
      <CircularProgress />
    </Container>
  );
}
