import React, { useContext } from "react";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../store";
import "./home.css";

function Home(): JSX.Element {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <p>Customer servise | authenticated = {auth.authenticated ? "true" : "false"}</p>
    </div>
  );
}

export default Home;
