import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../../utils/type.utils";

const style: ComponentsOverrides["MuiInputBase"] = {
  input: {
    "&:-webkit-autofill": {
      boxShadow: "inset 0 0 0 30px var( --color-input-autofocus)",
      "& + button": {
        marginLeft: "-52px",
      },
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
