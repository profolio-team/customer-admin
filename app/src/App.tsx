import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ButtonsPage,
  CheckboxesPage,
  HeaderPage,
  DialogPage,
  InputsPage,
  TypographyPage,
} from "./views/DesignSystem";
import { Header } from "./components";
import { ThemeContextProvider } from "./components/core/theme";
import { FirestorePage } from "./views/Firestore/FirestorePage";
import { AuthProvider } from "./hooks/useAuth";
import { DialogProvider } from "./hooks/useDialog";
import { ConfigProvider } from "./hooks/config";
import { UserInfoPage } from "./views/UserInfo/UserInfoPage";
import { NotFoundPage } from "./views/Error/NotFoundPage";
import { ContactsPage } from "./views/Contacts/Contacts";
import { ExamplesPage } from "./views/Examples/Examples";
import { DashboardPage } from "./views/Dashboard/Dashboard";
import { CompanyInfoPage } from "./views/CompanyInfo/CompanyInfoPage";

export default function App(): JSX.Element {
  const routesComponent = (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/design-system-inputs" element={<InputsPage />} />
      <Route path="/design-system-buttons" element={<ButtonsPage />} />
      <Route path="/design-system-typography" element={<TypographyPage />} />
      <Route path="/design-system-checkboxes" element={<CheckboxesPage />} />
      <Route path="/design-system-header" element={<HeaderPage />} />
      <Route path="/design-system-dialog" element={<DialogPage />} />
      <Route path="/firestore" element={<FirestorePage />} />
      <Route path="/settings/company-info" element={<CompanyInfoPage />} />
      <Route path="/user-info" element={<UserInfoPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/examples" element={<ExamplesPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  return (
    <ThemeContextProvider>
      <DialogProvider>
        <BrowserRouter>
          <AuthProvider>
            <ConfigProvider>
              <Header />
              {routesComponent}
            </ConfigProvider>
          </AuthProvider>
        </BrowserRouter>
      </DialogProvider>
    </ThemeContextProvider>
  );
}
