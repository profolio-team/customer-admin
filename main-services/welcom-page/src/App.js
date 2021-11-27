import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import StatusPage from "./page/StatusPage";
import RegistrationPage from "./page/RegistrationPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Link to="/">Main</Link> | <Link to="/status">Deploy Status</Link>
        <hr />
        <Routes>
          <Route path="status" element={<StatusPage />} />
          <Route path="/" element={<RegistrationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
