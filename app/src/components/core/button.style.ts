import { Components, ComponentsOverrides, ComponentsVariants } from "@mui/material";
import { GetTypeOfProperty } from "./utils/type.utils";

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
      paddingInlineEnd: 14,
      paddingInlineStart: 14,
    },
  },
  {
    props: { size: "iconSquareLarge" },
    style: {
      height: "56px",
      paddingInlineEnd: 18,
      paddingInlineStart: 18,
    },
  },
  {
    props: { variant: "outlined" },
    style: {
      "&:focus": {
        
      },
    },
  },
  {
    props: { size: "large" },
    style: {
      height: "56px",
      paddingInlineEnd: 24,
      paddingInlineStart: 24,
    },
  },
  {
    props: { variant: "text" },
    style: {
      "&:focus": {
      },
    },
  },
];

const style: ComponentsOverrides["MuiButton"] = {
  root: {
    height: "38px",
    paddingInlineEnd: '15px',
    paddingInlineStart: '15px',
    minWidth: 0,
    fontSize: "16px",
    fontFamily: "var(--font-family)",
    fontWeight: "normal",
    fontStyle: "normal",
    textTransform: "none",
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
      boxShadow: '0 0 0 2px var(--color-neutral-1), 0 0 0 4px var(--color-theme-primary)',
    },
  },
};

export const customButton: GetTypeOfProperty<Components, "MuiButton"> = {
  variants: variants,
  styleOverrides: style,
};
