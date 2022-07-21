import React from "react";
import "../src/assets/styles/globals.css";
import { ThemeContextProvider } from "../src/components/core/theme";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../src/hooks/useNotification";
import {DialogProvider} from "../src/hooks/useDialog";

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <ThemeContextProvider>
        <NotificationProvider>
          <DialogProvider>
            <Story />
          </DialogProvider>
        </NotificationProvider>
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
