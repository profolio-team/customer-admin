import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { customButton } from "./button.style";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { customTypography } from "./typography.style";
import { customInput } from "./input.style";

const customPalette: PaletteOptions = {};

export const ThemeContextProvider: React.FC = ({ children }) => {
  const theme = createTheme({
    palette: customPalette,
    components: {
      MuiInputBase: customInput,
      MuiTypography: customTypography,
      MuiButton: customButton,
    },
  });
  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
};
