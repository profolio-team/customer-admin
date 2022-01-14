/* tslint:disable */
import React, { useEffect, useReducer } from "react";

import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import { IAuthStateProps } from "./auth.types";
import { LOGIN, LOGOUT } from "./authReducerTypes";
import apiUrls from "../../config/backendApiUrlConfig";
import Keycloak from "keycloak-js";

export const AuthState = ({ children }: IAuthStateProps): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    keycloak: undefined,
  });

  const authorizationHeader = () => {
    return {
      headers: {
        Authorization: "", // TODO
      },
    };
  };

  const login = async () => {
    if (state.authenticated || state.keycloak) {
      return;
    }
    const urlDataReq = await fetch(apiUrls.getKeyCloakSettingByDomain, {
      method: "POST",
      body: JSON.stringify({
        domain: location.host,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const urlData: {
      realm: string;
      url: string;
      clientId: string;
      redirectUrl: string;
    } = await urlDataReq.json();
    console.log(urlData);

    const keycloak = Keycloak({
      realm: urlData.realm,
      url: urlData.url,
      clientId: urlData.clientId,
    });

    keycloak.init({ onLoad: "login-required", checkLoginIframe: true }).then(async (authenticated) => {
      dispatch({
        type: LOGIN,
        payload: { authenticated },
      });
    });
  };

  useEffect(() => {
    login();
  });

  const logout = async () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        authorizationHeader,
        auth: state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
