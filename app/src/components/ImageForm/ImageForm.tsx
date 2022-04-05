import { Delete, Photo } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import PopupState, { bindMenu, bindTrigger, InjectedProps } from "material-ui-popup-state";
import { ChangeEvent, useEffect } from "react";

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

  const onFileUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    setImageValue({ state: ImageState.SHOULD_UPLOAD_NEW_FILE, file });
  };

  const onPhotoDelete = (popupState: InjectedProps) => {
    setImageValue({ state: ImageState.SHOULD_REMOVE, file: null });
    popupState.close();
  };

  useEffect(() => setImageValue(INITIAL_IMAGE_VALUE), [url]);

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
              <MenuItem onClick={() => onPhotoDelete(popupState)}>
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
