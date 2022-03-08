import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../utils/type.utils";

const style: ComponentsOverrides["MuiTypography"] = {
  h1: {
    fontSize: "3rem",
    fontWeight: 500,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 500,
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  body1: {
    fontSize: "1.125rem",
  },
  body2: {
    fontSize: "1rem",
  },
  caption: {
    fontSize: "0.875rem",
  },
};

export const customTypography: GetTypeOfProperty<Components, "MuiTypography"> = {
  styleOverrides: style,
};
