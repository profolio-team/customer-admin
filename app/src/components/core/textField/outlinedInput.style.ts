import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiOutlinedInput"] = {
  input: {
    backgroundColor: "var(--color-neutral-1)",
    padding: "10px 12px",
  },
  root: {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid var(--color-neutral-8)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid",
      borderColor: "var(--color-theme-primary)",
    },
    "&.Mui-hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-neutral-8)",
    },
    "&.Mui-error": {
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-functional-error)",
      },
    },
  },
};

export const customOutlinedInput: GetTypeOfProperty<Components, "MuiOutlinedInput"> = {
  styleOverrides: style,
  defaultProps: {
    notched: false,
  },
};
