import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../store";
import { IKeycloakUserInfo } from "../ProfileBlock.types";

export const Navbar = () => {
  const { logout, auth } = useContext(AuthContext);

  const [userInfoData, setUserInfoData] = useState({
    name: "",
    email: "",
    id: "",
  });

  if (!userInfoData.id && auth.keycloak) {
    auth.keycloak.loadUserInfo().then((keycloadData) => {
      const userData = keycloadData as IKeycloakUserInfo;
      setUserInfoData({
        name: userData.name,
        email: userData.email,
        id: userData.sub,
      });
    });
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <div className="navbar-brand">Profolio Admin Panel</div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/customers" className="nav-link">
              Customers
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/test-api" className="nav-link">
              Test Api
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/admin-pofile" className="nav-link">
              Profile ({userInfoData.name} {userInfoData.email})
            </NavLink>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#logout" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
