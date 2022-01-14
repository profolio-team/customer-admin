import React, { useContext } from "react";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../store";
import "./home.css";

function Home(): JSX.Element {
  const { auth } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Customer servise | authenticated = {auth.authenticated ? "true" : "false"}</p>
      </header>
    </div>
  );
}

export default Home;
