import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { customButton } from './button.style';
import { PaletteOptions } from '@mui/material/styles/createPalette';

const customPalette: PaletteOptions = {
    action: {
      active: '#1055BB',
      disabled: '#ADB5BD',
      focus: '#1055BB',
      hover: '#105FD5',
    },
    text: {
      primary: '#FFFFFF',
    },
    primary: {
      main: '#1068EB',
    },
  };

export const ThemeContextProvider: React.FC = ({ children }) => {
  const theme = createTheme({
    palette: customPalette,
    components: {
      MuiButton: customButton
    },
  });
  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
};


