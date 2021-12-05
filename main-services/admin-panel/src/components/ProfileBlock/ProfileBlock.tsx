import React, { useContext, useState } from "react";
import { AuthContext } from "../../store";
import { IKeycloakUserInfo } from "./ProfileBlock.types";

export function ProfileBlock() {
  const { auth } = useContext(AuthContext);

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
    <div className="UserInfo">
      <h3>My profile:</h3>
      <p>Name: {userInfoData.name}</p>
      <p>Email: {userInfoData.email}</p>
      <p>ID: {userInfoData.id}</p>
      <hr />
    </div>
  );
}
