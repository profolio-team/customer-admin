import Button from "@mui/material/Button";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { Box, Container, Stack, Typography } from "@mui/material";

export function ButtonsPage(): JSX.Element {
  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Buttons
        </Typography>
      </Box>
      <hr />
      <Box>
        <Stack direction={"row"} gap="2rem">
          <Button variant="contained">Contained button</Button>

          <Button variant="contained" startIcon={<ErrorOutlinedIcon />}>
            Contained icon
          </Button>

          {/* Just Icon */}
          <Button variant="contained" size={"iconSquareSmall"}>
            <ErrorOutlinedIcon />
          </Button>
        </Stack>
        <hr />
        <Stack direction={"row"} gap="2rem">
          <Button variant="text">Text button</Button>

          <Button variant="text" startIcon={<ErrorOutlinedIcon />}>
            Text icon
          </Button>

          {/* Just Icon */}
          <Button variant="text" size={"iconSquareSmall"}>
            <ErrorOutlinedIcon />
          </Button>
        </Stack>

        <hr />
        <Stack direction={"row"} gap="2rem">
          <Button variant="outlined">Outlined button</Button>

          <Button variant="outlined" startIcon={<ErrorOutlinedIcon />}>
            Outlined icon
          </Button>

          {/* Just Icon */}
          <Button variant="outlined" size={"iconSquareSmall"}>
            <ErrorOutlinedIcon />
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
