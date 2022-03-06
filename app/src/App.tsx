import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/home";
import { InputsPage, ButtonsPage, TypographyPage, HeaderPage } from "./views/DesignSystem";
import { Header } from "./components/core";
import { ThemeContextProvider } from "./components/core/theme";
import { FirestorePage } from "./views/Firestore/FirestorePage";

export default function App(): JSX.Element {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-system-inputs" element={<InputsPage />} />
          <Route path="/design-system-buttons" element={<ButtonsPage />} />
          <Route path="/design-system-typography" element={<TypographyPage />} />
          <Route path="/design-system-header" element={<HeaderPage />} />
          <Route path="/firestore" element={<FirestorePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}
