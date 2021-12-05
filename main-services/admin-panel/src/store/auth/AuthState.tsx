import React, { useEffect, useReducer } from "react";

import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import { IAuthStateProps } from "./auth.types";
import { LOGIN, LOGOUT } from "./authReducerTypes";
import keycloakConfig from "../../config/keycloakConfig";
import Keycloak from "keycloak-js";

export const AuthState = ({ children }: IAuthStateProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    keycloak: undefined,
  });

  const login = () => {
    if (state.keycloak || state.authenticated) {
      return;
    }

    const keycloak = Keycloak(keycloakConfig);
    keycloak.onTokenExpired = async () => {
      await keycloak.updateToken(2);
    };
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: true })
      .then((authenticated) => {
        dispatch({
          type: LOGIN,
          payload: { keycloak, authenticated },
        });
      });
  };

  useEffect(login);

  const logout = async () => {
    if (state.keycloak) {
      await state.keycloak.logout();
    }
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        auth: state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
