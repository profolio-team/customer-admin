import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import "./assets/styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeContextProvider } from './components/core/theme';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </ThemeContextProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);
