import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

export function NotFoundPage(): JSX.Element {
  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          404: Page not found
        </Typography>
      </Box>
      <hr />
      <Box>
        <Typography variant="body2" component="p">
          Sorry. The page you are looking for has been removed or moved to somewhere else.
        </Typography>
      </Box>
    </Container>
  );
}
