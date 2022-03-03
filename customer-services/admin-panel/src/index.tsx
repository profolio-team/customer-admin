import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import "./assets/styles/globals.css";
import { StyledEngineProvider } from '@mui/material/styles';


ReactDOM.render(    <StyledEngineProvider injectFirst>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById("root")
);
