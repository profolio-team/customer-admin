import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components";
import { CustomersPage } from "./views";
import "./styles/globals.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Button>
          <Link to="/secured">Login</Link>
        </Button>
        <hr />
        <Routes>
          <Route path="secured" element={<CustomersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
