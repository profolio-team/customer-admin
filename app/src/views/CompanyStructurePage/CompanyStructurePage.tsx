import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function CompanyStructurePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 0" }}>
      <Stack direction={"row"} sx={{ padding: "2rem 0" }} justifyContent={"space-between"}>
        <Typography variant="h2" component="h2">
          Company structure
        </Typography>
        <Button variant="contained" onClick={() => navigate("create")}>
          Create New Department
        </Button>
      </Stack>
    </Container>
  );
}
