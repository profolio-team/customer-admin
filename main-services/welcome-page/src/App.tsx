import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./page/WelcomePage";
import AuthorizationPage from "./page/AuthorizationPage";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<AuthorizationPage form={"CreateAccount"} />} />
        <Route path="/sign-in" element={<AuthorizationPage form={"SignIn"} />} />
        <Route path="/recovery-password" element={<AuthorizationPage form={"RecoveryPassword"} />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
