import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ButtonsPage,
  CheckboxesPage,
  DialogPage,
  HeaderPage,
  InputsPage,
  PreloaderPage,
  SnackbarPage,
  TypographyPage,
} from "./views/DesignSystem";
import { Header } from "./components";
import { ThemeContextProvider } from "./components/core/theme";
import { AuthProvider } from "./hooks/useAuth";
import { DialogProvider } from "./hooks/useDialog";
import { ConfigProvider } from "./hooks/config";

import { UserInfoPage } from "./views/UserInfo/UserInfoPage";
import { NotFoundPage } from "./views/Error/NotFoundPage";
import { ContactsPage } from "./views/Contacts/Contacts";
import { ExamplesPage } from "./views/Examples/Examples";
import { DashboardPage } from "./views/Dashboard/Dashboard";
import { TableDesign } from "./views/DesignSystem/TableDesign";
import { ChangePasswordPage } from "./views/ChangePassword/ChangePasswordPage";

import { NotificationProvider } from "./hooks/useNotification";

import { AuthPage } from "./views/Auth/AuthPage";
import { SignInForm } from "./views/Auth/Forms/SignIn";
import { SignUpForm } from "./views/Auth/Forms/SignUp";

import { RedirectPage } from "./views/Redirect/RedirectPage";
import { CompanyInfoPage } from "./views/CompanyInfo/CompanyInfoPage";

export default function App(): JSX.Element {
  const routesComponent = (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/sign-in" element={<AuthPage formComponent={<SignInForm />} />} />
      <Route path="/sign-up" element={<AuthPage formComponent={<SignUpForm />} />} />

      <Route path="/redirect" element={<RedirectPage />} />

      <Route path="/design-system-inputs" element={<InputsPage />} />
      <Route path="/design-system-buttons" element={<ButtonsPage />} />
      <Route path="/design-system-typography" element={<TypographyPage />} />
      <Route path="/design-system-checkboxes" element={<CheckboxesPage />} />
      <Route path="/design-system-header" element={<HeaderPage />} />
      <Route path="/design-system-dialog" element={<DialogPage />} />
      <Route path="/design-system-table" element={<TableDesign />} />
      <Route path="/design-system-snackbar" element={<SnackbarPage />} />
      <Route path="/design-system-preloader" element={<PreloaderPage />} />
      <Route path="/user-info" element={<UserInfoPage />} />
      <Route path="/settings/company-info" element={<CompanyInfoPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/examples" element={<ExamplesPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
    </Routes>
  );

  return (
    <ThemeContextProvider>
      <NotificationProvider>
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
      </NotificationProvider>
    </ThemeContextProvider>
  );
}
