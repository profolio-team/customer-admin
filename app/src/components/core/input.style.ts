import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../utils/type.utils";

const style: ComponentsOverrides["MuiInputBase"] = {
  root: {
    "label + &": {
      marginTop: "1.3rem",
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "var(--color-neutral-1)",
      boxShadow: "0 0 0 1px var(--color-neutral-5)",
      fontSize: 16,

      padding: "10px 12px",
      transition: "box-shadow 0.1s",
      "&:hover": {
        boxShadow: "0 0 0 1px var(--color-neutral-7)",
      },
      "&:focus": {
        boxShadow: `0 0 0 2px var(--color-theme-primary)`,
      },
    },
  },
};

export const customInput: GetTypeOfProperty<Components, "MuiInputBase"> = {
  styleOverrides: style,
};
