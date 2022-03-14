import { GetTypeOfProperty } from "../../../utils/type.utils";
import { Components, ComponentsOverrides } from "@mui/material";

const style: ComponentsOverrides["MuiTextField"] = {
  root: {},
};

export const customTextField: GetTypeOfProperty<Components, "MuiTextField"> = {
  styleOverrides: style,
};
