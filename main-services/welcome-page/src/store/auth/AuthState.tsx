/* tslint:disable */
import React, { useReducer } from "react";

import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import { IAuthStateProps } from "./auth.types";
import { LOGOUT } from "./authReducerTypes";
import apiUrls from "../../config/backendApiUrlConfig";
import Keycloak from "keycloak-js";

export const AuthState = ({ children }: IAuthStateProps): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
  });

  const authorizationHeader = () => {
    return {
      headers: {
        Authorization: "", // TODO
      },
    };
  };

  const signup = async (email: string, domain: string) => {
    try {
      const url = apiUrls.customerRegistrationUrl;
      const req = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          domain,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await req.json();
      return result.error || "";
    } catch (error) {
      return error + "";
    }
  };

  const login = async (email: string) => {
    const urlDataReq = await fetch(apiUrls.getKeyCloakSettingByUserName, {
      method: "POST",
      body: JSON.stringify({
        email,
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

    if (!urlData.realm) {
      alert("Failed");
      return;
    }
    const keycloak = Keycloak({
      realm: urlData.realm,
      url: urlData.url,
      clientId: urlData.clientId,
    });
    keycloak.onTokenExpired = async () => {
      await keycloak.updateToken(2);
    };
    await keycloak.init({ checkLoginIframe: false });
    await keycloak.login({
      redirectUri: urlData.redirectUrl,
      prompt: "login",
      loginHint: email,
    });
  };

  const logout = async () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        authorizationHeader,
        auth: state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
