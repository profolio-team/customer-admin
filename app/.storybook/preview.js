import React from "react";
import "../src/assets/styles/globals.css";
import { ThemeContextProvider } from "../src/components/core/theme";
import { BrowserRouter } from "react-router-dom";

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    </BrowserRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
