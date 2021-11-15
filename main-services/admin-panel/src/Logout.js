import React from "react";

export default function Logout({ keycloak }) {
  const logout = async () => {
    await keycloak.logout();
  };

  return <button onClick={logout}>Logout</button>;
}
