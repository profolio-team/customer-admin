import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

export function ExamplesPage(): JSX.Element {
  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Examples Page
        </Typography>
      </Box>
      <hr />
      <Box>
        <Typography variant="body2" component="p">
          Examples Page
        </Typography>
      </Box>
    </Container>
  );
}
