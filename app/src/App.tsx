import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components";

import { ThemeContextProvider } from "./components/core/theme";
import { ConfigProvider } from "./hooks/config";
import { AuthProvider } from "./hooks/useAuth";
import {
  ButtonsPage,
  CheckboxesPage,
  HeaderPage,
  InputsPage,
  SnackbarPage,
  TypographyPage,
} from "./views/DesignSystem";
import { FirestorePage } from "./views/Firestore/FirestorePage";

export default function App(): JSX.Element {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthProvider>
          <ConfigProvider>
            <Header />
            <Routes>
              <Route path="/" element={<TypographyPage />} />
              <Route path="/design-system-inputs" element={<InputsPage />} />
              <Route path="/design-system-buttons" element={<ButtonsPage />} />
              <Route path="/design-system-typography" element={<TypographyPage />} />
              <Route path="/design-system-checkboxes" element={<CheckboxesPage />} />
              <Route path="/design-system-header" element={<HeaderPage />} />
              <Route path="/firestore" element={<FirestorePage />} />
              <Route path="/snackbar" element={<SnackbarPage />} />
            </Routes>
          </ConfigProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}
