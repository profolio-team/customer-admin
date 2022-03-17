import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../utils/type.utils";

const style: ComponentsOverrides["MuiSnackbarContent"] = {
  root: {
    maxHeight: "124px",
    paddingInlineEnd: "16px",
    paddingInlineStart: "16px",
    minWidth: 0,
    fontSize: "16px",
    fontFamily: "var(--font-family)",
    fontWeight: "normal",
    fontStyle: "normal",
    textTransform: "none",
    width: "400px",
    backgroundColor: "var(--color-theme-secondary)",
    marginRight: "30px",
    marginBottom: "30px",
    "& .MuiSvgIcon-root": {
      height: "20px",
      width: "20px",
      margin: 0,
      paddingInlineStart: 0,
    },
    "&:active": {
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "0 0 0 2px var(--color-neutral-1), 0 0 0 4px var(--color-theme-primary)",
    },
  },
};

export const customSnackbar: GetTypeOfProperty<Components, "MuiSnackbarContent"> = {
  styleOverrides: style,
};
