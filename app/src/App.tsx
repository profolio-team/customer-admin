import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  InputsPage,
  ButtonsPage,
  TypographyPage,
  CheckboxesPage,
  HeaderPage,
} from "./views/DesignSystem";
import { Header } from "./components/core";
import { ThemeContextProvider } from "./components/core/theme";
import { FirestorePage } from "./views/Firestore/FirestorePage";
import { AuthProvider } from "./hooks/useAuth";
import { ConfigProvider } from "./hooks/config";

export default function App(): JSX.Element {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <ConfigProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<TypographyPage />} />
              <Route path="/design-system-inputs" element={<InputsPage />} />
              <Route path="/design-system-buttons" element={<ButtonsPage />} />
              <Route path="/design-system-typography" element={<TypographyPage />} />
              <Route path="/design-system-checkboxes" element={<CheckboxesPage />} />
              <Route path="/design-system-header" element={<HeaderPage />} />
              <Route path="/firestore" element={<FirestorePage />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
}
