import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fromBase64 } from "../../utils/converters";

export function RedirectPage(): JSX.Element {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const toParam = params.get("to");

  useEffect(() => {
    if (toParam) {
      const urlTo = fromBase64(toParam);
      setTimeout(() => {
        location.href = urlTo;
      });
    }
  }, [toParam]);

  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Redirecting
        </Typography>
      </Box>
    </Container>
  );
}
