import { GetTypeOfProperty } from "../../utils/type.utils";
import { Components } from "@mui/material";

export const customAutocomplete: GetTypeOfProperty<Components, "MuiAutocomplete"> = {
  styleOverrides: {
    inputRoot: {
      padding: "2px",
    },
  },
  defaultProps: {
    fullWidth: true,
  },
};
