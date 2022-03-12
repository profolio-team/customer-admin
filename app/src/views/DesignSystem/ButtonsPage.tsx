import Button, { ButtonProps } from "@mui/material/Button";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { Box, Container, Stack, Typography } from "@mui/material";

const Buttons = (props: ButtonProps) => {
  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction={"row"}>
        <Button variant={props.variant}>Cancel</Button>
        <Button variant={props.variant} startIcon={<ErrorOutlinedIcon />}>
          Cancel
        </Button>
        <Button variant={props.variant} size={"iconSquareSmall"}>
          <ErrorOutlinedIcon />
        </Button>
      </Stack>
      <Stack spacing={2} direction={"row"}>
        <Button variant={props.variant} size={"large"}>
          Cancel
        </Button>
        <Button variant={props.variant} size={"large"} startIcon={<ErrorOutlinedIcon />}>
          Cancel
        </Button>
        <Button variant={props.variant} size="iconSquareLarge">
          <ErrorOutlinedIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

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
        <Stack spacing={3} direction={"row"}>
          <Buttons variant={"contained"} />
          <Buttons variant={"text"} />
          <Buttons variant={"outlined"} />
        </Stack>
      </Box>
    </Container>
  );
}
