import React, { useContext } from "react";
import { AuthContext } from "../../store";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
      <div className="navbar-brand">Profolio Admin Panel</div>

      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#logout" onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};
