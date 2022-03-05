import React, { useContext } from "react";
import { AuthContext } from "../../store";

function Home(): JSX.Element {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <p>Customer servise | authenticated = {auth.authenticated ? "true" : "false"}</p>
    </div>
  );
}

export default Home;
