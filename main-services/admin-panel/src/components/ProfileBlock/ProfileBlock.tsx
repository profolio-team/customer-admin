import React, { useState } from "react";
import Keycloak from "keycloak-js";

interface IProflieBlock {
  keycloak: Keycloak.KeycloakInstance;
}

interface IKeycloakUserInfo {
  name: string;
  email: string;
  sub: string;
}

export function ProfileBlock({ keycloak }: IProflieBlock) {
  const [userInfoData, setUserInfoData] = useState({
    name: "",
    email: "",
    id: "",
  });

  if (!userInfoData.id && keycloak) {
    keycloak.loadUserInfo().then((keycloadData) => {
      const userData = keycloadData as IKeycloakUserInfo;
      setUserInfoData({
        name: userData.name,
        email: userData.email,
        id: userData.sub,
      });
    });
  }

  return (
    <div className="UserInfo">
      <h3>My profile:</h3>
      <p>Name: {userInfoData.name}</p>
      <p>Email: {userInfoData.email}</p>
      <p>ID: {userInfoData.id}</p>
      <hr />
    </div>
  );
}
