import React, { useState } from "react";

export default function UserInfo({ keycloak }) {
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

  return (
    <div className="UserInfo">
      <p>Name: {userInfoData.name}</p>
      <p>Email: {userInfoData.email}</p>
      <p>ID: {userInfoData.id}</p>
    </div>
  );
}
