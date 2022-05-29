import { Delete, Photo } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem, Stack, TextField } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { ChangeEvent, useEffect } from "react";
import { useDialog } from "../../hooks/useDialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export enum ImageState {
  NOT_CHANGED = "NOT_CHANGED",
  SHOULD_UPLOAD_NEW_FILE = "SHOULD_UPLOAD_NEW_FILE",
  SHOULD_REMOVE = "SHOULD_REMOVE",
}

export interface ImageValue {
  state: ImageState;
  file: File | null;
}

export const INITIAL_IMAGE_VALUE: ImageValue = {
  state: ImageState.NOT_CHANGED,
  file: null,
};

interface ImageProps {
  setImageValue: (value: ImageValue) => void;
  url: string | null;
  imageValue: ImageValue;
}

export function ImageForm({ imageValue, setImageValue, url }: ImageProps) {
  const shouldRemoveState = imageValue.state === ImageState.SHOULD_REMOVE;
  const browserUploadedFileUrl = imageValue.file && URL.createObjectURL(imageValue.file);
  const defaultUrl = shouldRemoveState ? "" : url;
  const imageUrl = browserUploadedFileUrl || defaultUrl || "";
  const { closeDialog, showDialog } = useDialog();

  const onFileUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    setImageValue({ state: ImageState.SHOULD_UPLOAD_NEW_FILE, file });
  };

  const onPhotoDelete = () => {
    setImageValue({ state: ImageState.SHOULD_REMOVE, file: null });
  };

  useEffect(() => setImageValue(INITIAL_IMAGE_VALUE), [url]);

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
                  onPhotoDelete();
                  resolve(true);
                  closeDialog();
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

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <TextField
            type={"file"}
            sx={{ display: "none" }}
            id="select-image"
            onChange={onFileUpdate}
          />
          <label htmlFor={!imageUrl ? "select-image" : ""}>
            <IconButton
              sx={{ height: 160, width: 160 }}
              component="span"
              {...bindTrigger(popupState)}
            >
              <Avatar draggable="false" sx={{ width: 160, height: 160 }} src={imageUrl} />
            </IconButton>
          </label>
          {imageUrl && (
            <Menu {...bindMenu(popupState)}>
              <label htmlFor="select-image">
                <MenuItem onClick={popupState.close}>
                  <Photo sx={{ paddingRight: "5px" }} />
                  Change Photo
                </MenuItem>
              </label>
              <MenuItem onClick={displayConfirmDialog}>
                <Delete sx={{ paddingRight: "5px" }} />
                Delete Photo
              </MenuItem>
            </Menu>
          )}
        </>
      )}
    </PopupState>
  );
}
