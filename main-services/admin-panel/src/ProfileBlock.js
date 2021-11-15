import React, { useState } from "react";

export default function ProfileBlock({ keycloak }) {
  const [userInfoData, setUserInfoData] = useState({
    name: "",
    email: "",
    id: "",
  });

  if (!userInfoData.id && keycloak) {
    keycloak.loadUserInfo().then((userInfo) => {
      setUserInfoData({
        name: userInfo.name,
        email: userInfo.email,
        id: userInfo.sub,
      });
    });
  }

  const logout = async () => {
    await keycloak.logout();
  };

  return (
    <div className="UserInfo">
      <h3>My profile:</h3>
      <p>Name: {userInfoData.name}</p>
      <p>Email: {userInfoData.email}</p>
      <p>ID: {userInfoData.id}</p>
      <button onClick={logout}>Logout</button>
      <hr />
    </div>
  );
}
