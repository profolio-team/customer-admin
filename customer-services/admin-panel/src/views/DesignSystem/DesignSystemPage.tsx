import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
export function DesignSystemPage(): JSX.Element {
  return (
    <div className="page-content">
      <h1>Design System</h1>
      <nav>
        <NavLink to="/design-system/components">Components</NavLink>
        <br />

        <NavLink to="/design-system/typography">Typography</NavLink>
        <br />
        </nav>
    </div>
  );
}