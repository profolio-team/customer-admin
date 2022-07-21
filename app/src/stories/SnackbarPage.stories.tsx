import { useNotification } from "../hooks/useNotification";
import { Box, Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as React from "react";
import { Meta } from "@storybook/react";

export default {
  title: "Components",
} as Meta;

export function Snackbars(): JSX.Element {
  const { showNotification } = useNotification();

  const successClick = () => {
    showNotification({
      message: "Success",
      type: "success",
    });
  };
  const errorHandleClick = () => {
    showNotification({
      message: "Error",
      type: "error",
    });
  };
  const warningHandleClick = () => {
    showNotification({
      message: "Warning",
      type: "warning",
    });
  };
  const infoHandleClick = () => {
    showNotification({
      message: "Error",
      type: "info",
    });
  };

  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Snackbars
        </Typography>
      </Box>
      <hr />
      <Box>
        <Stack spacing={2} sx={{ width: "50%" }} alignItems="left">
          <Button variant="outlined" onClick={successClick}>
            Open success snackbar
          </Button>
          <Button variant="outlined" onClick={errorHandleClick}>
            Open error snackbar
          </Button>
          <Button variant="outlined" onClick={warningHandleClick}>
            Open warning snackbar
          </Button>
          <Button variant="outlined" onClick={infoHandleClick}>
            Open information snackbar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

Snackbars.storyName = "Snackbars";
