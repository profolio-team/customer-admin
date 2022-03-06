/* tslint:disable */
import React, { useEffect, useReducer } from "react";

import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import { IAuthStateProps } from "./auth.types";
import { LOGOUT } from "./authReducerTypes";
import apiUrls from "../../config/backendApiUrlConfig";

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

  const login = async () => {
    if (state.authenticated) {
      return;
    }
    const urlDataReq = await fetch(apiUrls.getKeyCloakSettingByDomain, {
      method: "POST",
      body: JSON.stringify({
        domain: `${location.origin}/`,
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
  };

  useEffect(() => {
    //login();
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
