import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiInputBase"] = {
  input: {
    "&:-webkit-autofill": {
      transitionDelay: "9999s",
      transitionProperty: "background-color, color",
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
};
