import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

export function DashboardPage(): JSX.Element {
  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Dashboard Page
        </Typography>
      </Box>
      <hr />
      <Box>
        <Typography variant="body2" component="p">
          Dashboard Page
        </Typography>
      </Box>
    </Container>
  );
}
