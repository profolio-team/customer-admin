import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Alert } from "./components";
import { CustomersPage } from "./views";
import { AlertState } from "./store/alert/AlertState";

import "./styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <AlertState>
        <Navbar />
        <div className="container pt-4">
          <Alert />
          <Routes>
            <Route path="secured" element={<CustomersPage />} />
          </Routes>
        </div>
      </AlertState>
    </BrowserRouter>
  );
}
