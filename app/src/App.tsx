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
import { ErrorPage } from "./components/Error/ErrorPage";
import { ContactsPage } from "./views/StaticPages/Contacts/Contacts";
import { ExamplesPage } from "./views/StaticPages/Examples/Examples";
import { DashboardPage } from "./views/Dashboard/Dashboard";
import { TableDesign } from "./views/DesignSystem/TableDesign";
import { ChangePasswordPage } from "./views/ChangePassword/ChangePasswordPage";

import { NotificationProvider } from "./hooks/useNotification";

import { AuthPage } from "./views/Auth/AuthPage";
import { SignIn } from "./components/AuthForms/SignIn";
import { SignUpForm } from "./components/AuthForms/SignUp";

import { RedirectPage } from "./views/Redirect/RedirectPage";
import { CompanyInfoPage } from "./views/CompanyInfo/CompanyInfoPage";
import { InviteForm } from "./views/AddNewUser/InviteForm";
import { UsersPage } from "./views/Users/UsersPage";
import { DevButton } from "./components/DevButton/DevButton";
import { PrivacyPolicyPage } from "./views/StaticPages/Terms/PrivacyPolicy";
import { TermsOfServicePage } from "./views/StaticPages/Terms/TermsOfService";

export default function App(): JSX.Element {
  const routesComponent = (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/sign-in" element={<AuthPage formComponent={<SignIn />} />} />
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

      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />

      <Route path="*" element={<ErrorPage code={"404"} />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="users/create" element={<InviteForm />} />
      <Route path="users" element={<UsersPage />} />
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
                <DevButton />
              </ConfigProvider>
            </AuthProvider>
          </BrowserRouter>
        </DialogProvider>
      </NotificationProvider>
    </ThemeContextProvider>
  );
}
