import { Meta } from "@storybook/react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Container, Stack } from "@mui/material";
import { useDialog } from "../hooks/useDialog";

export default {
  title: "Components",
} as Meta;

export function DialogPage(): JSX.Element {
  const { showDialog, closeDialog } = useDialog();

  const displayConfirmDialog = () => {
    return new Promise((resolve) => {
      const closeHandlerWhenClickOutside = () => resolve(false);

      showDialog({
        title: "Delete Photo",
        closeHandler: closeHandlerWhenClickOutside,
        content: (
          <Box>
            <Typography variant="body1" component="p">
              Are you sure you want to delete this photo?
            </Typography>
            <Stack direction={"row"} gap="1rem" sx={{ margin: "2rem 0 1rem 0" }}>
              <Button
                variant="contained"
                onClick={() => {
                  closeDialog();
                  resolve(true);
                }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  closeDialog();
                  resolve(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ),
      });
    });
  };

  const showResult = (message: string) => {
    return new Promise<void>((resolve) => {
      showDialog({
        title: "Result",
        closeHandler: () => resolve(),
        content: (
          <Box>
            <Typography variant="body1" component="p">
              {message}
            </Typography>
          </Box>
        ),
      });
    });
  };

  const showConfirmDialog = async () => {
    const result = await displayConfirmDialog();
    if (result) {
      await showResult("Photo deleted");
    } else {
      await showResult("Photo NOT deleted");
    }
    console.log("After result");
  };

  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Dialog
        </Typography>
      </Box>
      <hr />
      <Box>
        <Button variant="outlined" onClick={showConfirmDialog}>
          Open dialog
        </Button>
      </Box>
    </Container>
  );
}

DialogPage.storyName = "Dialog";
