import { Box, Container, Typography } from "@mui/material";
import { Header } from "../../components/core";

export function HeaderPage(): JSX.Element {
  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Header
        </Typography>
      </Box>
      <hr />
      <Box>
        <Header />
      </Box>
    </Container>
  );
}
