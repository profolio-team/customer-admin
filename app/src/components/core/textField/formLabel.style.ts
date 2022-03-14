import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiFormLabel"] = {
  root: {
    color: "var(--color-neutral-8)",
    fontSize: "14px",
    "&.Mui-focused": {
      color: "var(--color-neutral-8)",
    },
    "&.Mui-error": {
      color: "var(--color-neutral-8)",
    },
    marginLeft: "4px",
  },
};

export const customFormLabel: GetTypeOfProperty<Components, "MuiFormLabel"> = {
  styleOverrides: style,
};
