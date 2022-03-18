import { GetTypeOfProperty } from "../../utils/type.utils";
import { Components, ComponentsOverrides } from "@mui/material";

const style: ComponentsOverrides["MuiAlert"] = {
  root: {
    backgroundColor: "var(--color-theme-secondary)",
    marginRight: "48px",
    marginBottom: "48px",
    maxHeight: "128px",
    minWidth: "440px",
    maxWidth: "440px",
  },
};

export const customAlert: GetTypeOfProperty<Components, "MuiAlert"> = {
  styleOverrides: style,
};
