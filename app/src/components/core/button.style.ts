import { Components, ComponentsOverrides, ComponentsVariants } from "@mui/material";
import { GetTypeOfProperty } from "../../utils/type.utils";

declare module "@mui/material/Button" {
  interface ButtonPropsSizeOverrides {
    iconSquareSmall: true;
    iconSquareLarge: true;
  }
}

const variants: ComponentsVariants["MuiButton"] = [
  {
    props: { size: "iconSquareSmall" },
    style: {
      paddingInlineEnd: "14px",
      paddingInlineStart: "14px",
    },
  },
  {
    props: { size: "iconSquareLarge" },
    style: {
      height: "3.4rem",
      paddingInlineEnd: "18px",
      paddingInlineStart: "18px",
    },
  },
  {
    props: { variant: "outlined" },
    style: {
      "&:focus": {
        border: "1px solid var(--color-theme-primary)",
        boxShadow:
          "0px 0px 0px 1px var(--color-neutral-1), 0px 0px 0px 2px var(--color-theme-primary)",
        borderRadius: "4px",
      },
    },
  },
  {
    props: { size: "large" },
    style: {
      height: "3.4rem",
      paddingInlineEnd: "24px",
      paddingInlineStart: "24px",
    },
  },
  {
    props: { variant: "text" },
    style: {
      "&:focus": {
        background: "var(--color-neutral-5)",
        border: "none",
        boxShadow: "none",
        borderRadius: "4px",
      },
    },
  },
];

const style: ComponentsOverrides["MuiButton"] = {
  outlined: {
    backgroundColor: "var(--color-neutral-1)",
    "&:hover": {
      backgroundColor: "var(--color-neutral-4)",
    },
    "&:active": {
      backgroundColor: "var(--color-neutral-5)",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: "var(--color-neutral-5)",
      boxShadow: "0 0 0 2px var(--color-neutral-1), 0 0 0 4px var(--color-theme-primary)",
    },
    "&:disabled": {
      color: "var(--color-neutral-1)",
      backgroundColor: "var(--color-neutral-6)",
    },
  },
  root: {
    height: "3rem",
    paddingInlineEnd: "16px",
    paddingInlineStart: "16px",
    minWidth: 0,
    fontSize: "1rem",
    fontWeight: "normal",
    fontStyle: "normal",
    textTransform: "none",
    "& .MuiSvgIcon-root": {
      height: "1.4rem",
      width: "1.4rem",
      margin: 0,
      paddingInlineStart: 0,
    },
    "&:active": {
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "0 0 0 2px var(--color-neutral-1), 0 0 0 4px var(--color-theme-primary)",
    },
    "&:disabled": {
      color: "var(--color-neutral-1)",
      backgroundColor: "var(--color-neutral-6)",
    },
  },
};

export const customButton: GetTypeOfProperty<Components, "MuiButton"> = {
  variants: variants,
  styleOverrides: style,
};
