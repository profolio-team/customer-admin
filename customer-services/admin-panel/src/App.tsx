import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/home";
import { AuthState } from "./store";

export default function App(): JSX.Element {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}
