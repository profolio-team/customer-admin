import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { customButton } from "./button.style";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { customTypography } from "./typography.style";
import { customInput } from "./textField/input.style";
import { customHelperText } from "./textField/formHelperText.style";
import { customFormLabel } from "./textField/formLabel.style";
import { customTextField } from "./textField/textField.style";
import { customOutlinedInput } from "./textField/outlinedInput.style";
import { customInputLabel } from "./textField/inputLabel.style";
import { customAvatar } from "./avatar.style";
import { customAlert } from "./alert.style";
import { customCircularProgress } from "./circularProgress.style";
import { customSwitch } from "./checkbox.style";

const customPalette: PaletteOptions = {};

export const ThemeContextProvider: React.FC = ({ children }) => {
  const theme = createTheme({
    palette: customPalette,
    components: {
      MuiTypography: customTypography,
      MuiButton: customButton,
      MuiInputBase: customInput,
      MuiFormHelperText: customHelperText,
      MuiFormLabel: customFormLabel,
      MuiTextField: customTextField,
      MuiOutlinedInput: customOutlinedInput,
      MuiInputLabel: customInputLabel,
      MuiAvatar: customAvatar,
      MuiAlert: customAlert,
      MuiCircularProgress: customCircularProgress,
      MuiSwitch: customSwitch,
    },
  });
  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
};
