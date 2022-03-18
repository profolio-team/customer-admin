import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  InputsPage,
  ButtonsPage,
  TypographyPage,
  CheckboxesPage,
  HeaderPage,
} from "./views/DesignSystem";
import { Header } from "./components";
import { ThemeContextProvider } from "./components/core/theme";
import { FirestorePage } from "./views/Firestore/FirestorePage";
import { AuthProvider } from "./hooks/useAuth";
import { ConfigProvider } from "./hooks/config";
import { UserInfoPage } from "./views/UserInfo/userInfoPage";
import { Form } from "./views/UserInfo/form";

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
              <Route path="/user-info" element={<UserInfoPage />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </ConfigProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}
