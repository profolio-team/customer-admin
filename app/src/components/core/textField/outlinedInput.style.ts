import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiOutlinedInput"] = {
  input: {
    display: "block!important",
    backgroundColor: "var(--color-neutral-1)",
    padding: "10px 12px",
    "&::placeholder": {
      opacity: 1,
      color: "var(--color-neutral-7)",
    },
  },
  root: {
    "::-webkit-input-placeholder": {
      color: "red",
      overflow: "visible",
      opacity: "1!important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid var(--color-neutral-8)",
      "&::placeholder": {
        overflow: "visible",
        textOverflow: "ellipsis !important",
        color: "blue",
      },
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
