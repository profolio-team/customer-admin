import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiInputBase"] = {
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "10px 100px 5px rgb(232, 240, 254) inset",
      WebkitTextFillColor: "var(--color-neutral-10)",
    },
  },
  root: {
    backgroundColor: "var(--color-neutral-1)",
    "label + &": {
      marginTop: "1.5rem",
    },
  },
};

export const customInput: GetTypeOfProperty<Components, "MuiInputBase"> = {
  styleOverrides: style,
  variants: [
    {
      props: { autoComplete: "Password" },
      style: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "10px 100px 5px rgb(232, 240, 254) inset, 53px 0 rgb(232, 240, 254)",
            WebkitTextFillColor: "var(--color-neutral-10)",
          },
        },
      },
    },
  ],
};
