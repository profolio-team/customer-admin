import { Box, Container, Typography } from "@mui/material";
import { UserHeader, StaticHeader } from "../../components";

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
        <StaticHeader />
      </Box>
      <Box>
        <UserHeader />
      </Box>
    </Container>
  );
}
