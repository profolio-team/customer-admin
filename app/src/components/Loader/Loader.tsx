import CircularProgress from "@mui/material/CircularProgress";
import { Box, Container } from "@mui/material";

export function Loader() {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", marginTop: "25%" }}>
      <Box>
        <CircularProgress disableShrink />
      </Box>
    </Container>
  );
}
