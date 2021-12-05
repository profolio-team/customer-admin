import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
      <div className="navbar-brand">Profolio Admin Panel</div>

      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/secured">
            Login
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
