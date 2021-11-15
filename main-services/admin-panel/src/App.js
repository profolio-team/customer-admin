import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Secured from "./Secured";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Link to="/secured">Login</Link>
        <hr />
        <Routes>
          <Route path="secured" element={<Secured />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
