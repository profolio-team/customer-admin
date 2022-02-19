import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./views/Home/home";
import {ComponentsPage, DesignSystemPage, TypographyPage} from "./views/DesignSystem";
import { AuthState } from "./store";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthState>
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/design-system">Design System</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/design-system/components" element={<ComponentsPage />} />
          <Route path="/design-system/typography" element={<TypographyPage />} />
        </Routes>
      </AuthState>
    </BrowserRouter>
  );
}
