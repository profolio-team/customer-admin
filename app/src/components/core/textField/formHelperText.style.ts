import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiFormHelperText"] = {
  root: {
    fontSize: "0.875rem",
    marginLeft: "4px",
    color: "var(--color-neutral-8)",
    "&.Mui-error": {
      color: "var(--color-functional-error)",
    },
  },
};

export const customHelperText: GetTypeOfProperty<Components, "MuiFormHelperText"> = {
  styleOverrides: style,
};
