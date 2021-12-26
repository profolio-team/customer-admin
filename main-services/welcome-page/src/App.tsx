import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthState } from "./store";
import { WelcomePage, AuthorizationPage, CheckYourEmail, InstallingProcessPage } from "./views";

export default function App(): JSX.Element {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<AuthorizationPage form={"CreateAccount"} />} />
          <Route path="/sign-in" element={<AuthorizationPage form={"SignIn"} />} />
          <Route path="/check-email" element={<CheckYourEmail />} />
          <Route path="/setup" element={<InstallingProcessPage />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}
