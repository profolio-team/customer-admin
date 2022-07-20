import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckboxesPage, DialogPage } from "./views/DesignSystem";
import { Header } from "./components";
import { ThemeContextProvider } from "./components/core/theme";
import { AuthProvider } from "./hooks/useAuth";
import { DialogProvider } from "./hooks/useDialog";
import { ConfigProvider } from "./hooks/config";

import { UserInfoPage } from "./views/UserInfo/UserInfoPage";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { ContactsPage } from "./views/StaticPages/Contacts/Contacts";
import { ExamplesPage } from "./views/StaticPages/Examples/Examples";
import { DashboardPage } from "./views/Dashboard/Dashboard";
import { TableDesign } from "./views/DesignSystem/TableDesign";
import { ChangePasswordPage } from "./views/ChangePassword/ChangePasswordPage";

import { NotificationProvider } from "./hooks/useNotification";

import { AuthPage } from "./views/Auth/AuthPage";
import { SignIn } from "./components/AuthForms/SignIn/SignIn";
import { CreateCompany } from "./components/AuthForms/CreateCompany/CreateCompany";

import { RedirectPage } from "./views/Redirect/RedirectPage";
import { CompanyInfoPage } from "./views/CompanyInfo/CompanyInfoPage";
import { UsersPage } from "./views/Users/UsersPage";
import { DevButton } from "./components/DevButton/DevButton";
import { PrivacyPolicyPage } from "./views/StaticPages/Terms/PrivacyPolicy";
import { TermsOfServicePage } from "./views/StaticPages/Terms/TermsOfService";
import { ConfirmCompany } from "./components/AuthForms/ConfirmCompany";
import { AcceptInvite } from "./components/AuthForms/AcceptInvite";
import { UserRouter } from "./views/UsersPages/UserRouter";

export default function App(): JSX.Element {
  const routesComponent = (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/sign-in" element={<AuthPage formComponent={<SignIn />} />} />
      <Route path="/sign-up" element={<AuthPage formComponent={<CreateCompany />} />} />

      <Route path="/confirm-company" element={<AuthPage formComponent={<ConfirmCompany />} />} />
      <Route path="/accept-invite" element={<AuthPage formComponent={<AcceptInvite />} />} />

      <Route path="/redirect" element={<RedirectPage />} />

      <Route path="/design-system-checkboxes" element={<CheckboxesPage />} />
      <Route path="/design-system-dialog" element={<DialogPage />} />
      <Route path="/design-system-table" element={<TableDesign />} />

      <Route path="/user-info" element={<UserInfoPage />} />
      <Route path="/settings/company-info" element={<CompanyInfoPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/examples" element={<ExamplesPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="*" element={<ErrorPage code={"404"} />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="users/:param" element={<UserRouter />} />
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
