import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiFormLabel"] = {
  root: {
    color: "var(--color-neutral-8)",
    fontSize: "0.875rem",
    marginLeft: "4px",
    "&.Mui-disabled": {
      color: "var(--color-neutral-8)",
    },
    "&.Mui-focused": {
      color: "var(--color-neutral-8)",
    },
    "&.Mui-error": {
      color: "var(--color-neutral-8)",
    },
  },
};

export const customFormLabel: GetTypeOfProperty<Components, "MuiFormLabel"> = {
  styleOverrides: style,
};
