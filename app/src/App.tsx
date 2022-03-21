import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  InputsPage,
  ButtonsPage,
  TypographyPage,
  CheckboxesPage,
  HeaderPage,
} from "./views/DesignSystem";
import { StaticHeader, UserHeader } from "./components";
import { ThemeContextProvider } from "./components/core/theme";
import { FirestorePage } from "./views/Firestore/FirestorePage";
import { AuthProvider } from "./hooks/useAuth";
import { ConfigProvider } from "./hooks/config";
import { UserInfoPage } from "./views/UserInfo/UserInfoPage";
import { NotFoundPage } from "./views/Error/NotFoundPage";
import { ContactsPage } from "./views/Contacts/Contacts";
import { ExamplesPage } from "./views/Examples/Examples";
import { DashboardPage } from "./views/Dashboard/Dashboard";

export default function App(): JSX.Element {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthProvider>
          <ConfigProvider>
            <UserHeader />
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/design-system-inputs" element={<InputsPage />} />
              <Route path="/design-system-buttons" element={<ButtonsPage />} />
              <Route path="/design-system-typography" element={<TypographyPage />} />
              <Route path="/design-system-checkboxes" element={<CheckboxesPage />} />
              <Route path="/design-system-header" element={<HeaderPage />} />
              <Route path="/firestore" element={<FirestorePage />} />
              <Route path="/user-info" element={<UserInfoPage />} />
              <Route
                path="/contacts"
                element={
                  <>
                    <StaticHeader />
                    <ContactsPage />
                  </>
                }
              />
              <Route
                path="/examples"
                element={
                  <>
                    <StaticHeader />
                    <ExamplesPage />
                  </>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ConfigProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}
