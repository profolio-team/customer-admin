import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Avatar, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { Delete, Photo } from "@mui/icons-material";
import { User } from "firebase/auth";

export function AvatarInput({ photoURL }: User) {
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    setAvatar(photoURL || "");
  }, []);
  const { register, setValue } = useFormContext();
  const showPreview = (files: FileList) => {
    if (files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      setAvatar(src);
    }
  };
  const DeletePhoto = () => {
    const file = new File([""], "deletedAvatar", { type: "image/png" });
    const dt = new DataTransfer();
    dt.items.add(file);
    const fileList = dt.files;
    setValue("avatar", fileList);
    setAvatar("");
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <TextField
            type={"file"}
            sx={{ display: "none" }}
            id="select-image"
            {...register("avatar", {
              required: false,
              onChange: (e) => showPreview(e.target.files),
            })}
          />
          <label htmlFor={avatar ? "" : "select-image"}>
            <IconButton
              sx={{ height: 160, width: 160 }}
              component="span"
              {...bindTrigger(popupState)}
            >
              <Avatar sx={{ width: 160, height: 160 }} src={avatar} />
            </IconButton>
          </label>
          {avatar && (
            <Menu {...bindMenu(popupState)}>
              <label htmlFor="select-image">
                <MenuItem onClick={popupState.close}>
                  <Photo sx={{ paddingRight: "5px" }} />
                  Change Photo
                </MenuItem>
              </label>
              <MenuItem
                onClick={() => {
                  DeletePhoto();
                  popupState.close();
                }}
              >
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
