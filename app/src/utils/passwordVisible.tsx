import { IconButton, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const passwordVisibleOptions = (): TextFieldProps => {
  const [visibility, setVisibility] = useState(false);
  const visible = () => {
    setVisibility(!visibility);
  };
  const type = visibility ? "text" : "password";
  const icon = visibility ? <Visibility /> : <VisibilityOff />;

  return {
    type,
    InputProps: {
      endAdornment: <IconButton onClick={visible}>{icon}</IconButton>,
    },
  };
};
