import React from "react";
import "../src/assets/styles/globals.css";
import { ThemeContextProvider } from "../src/components/core/theme";
export const decorators = [
  (Story) => (
    <ThemeContextProvider>
      <Story />
    </ThemeContextProvider>
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
