import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components";
import Secured from "./Secured";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Link to="/secured">Login</Link>
        <Button appearance="primary">Узнать подробнее</Button>
        <hr />
        <Routes>
          <Route path="secured" element={<Secured />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
