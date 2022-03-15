import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiInputLabel"] = {
  root: {
    transform: "none",
  },
};

export const customInputLabel: GetTypeOfProperty<Components, "MuiInputLabel"> = {
  styleOverrides: style,
  defaultProps: {
    shrink: true,
  },
};
