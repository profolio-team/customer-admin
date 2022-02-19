import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./views/Home/home";
import Components from "./views/Components/Components";
import { AuthState } from "./store";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthState>
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/components">Components page</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
        </Routes>
      </AuthState>
    </BrowserRouter>
  );
}
