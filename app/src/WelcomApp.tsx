import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./components/core/theme";
import { AuthProvider } from "./hooks/useAuth";
import { ConfigProvider } from "./hooks/config";
import { DashboardPage } from "./views/Dashboard/Dashboard";

export default function WelcomApp(): JSX.Element {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthProvider>
          <ConfigProvider>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              {/*
              Static Header

              Contact
              Examples
              
              */}
            </Routes>
          </ConfigProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}
