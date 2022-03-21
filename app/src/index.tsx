import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WelcomApp from "./WelcomApp";
import "normalize.css";
import "./assets/styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";

const isWelcomApp = process.env.REACT_APP_IS_WELCOM_APP_MODE === "true";

if (isWelcomApp) {
  ReactDOM.render(
    <StyledEngineProvider injectFirst>
      <React.StrictMode>
        <WelcomApp />
      </React.StrictMode>
    </StyledEngineProvider>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <StyledEngineProvider injectFirst>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StyledEngineProvider>,
    document.getElementById("root")
  );
}
