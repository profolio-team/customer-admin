import { ReactNode } from "react";
import Keycloak from "keycloak-js";

export interface IAuthState {
  authenticated: boolean;
  keycloak?: Keycloak.KeycloakInstance;
}

export interface IAuthAction {
  type: string;
  payload?: IAuthState;
}

export interface IAuthRequestHeaders {
  headers: {
    Authorization: string;
  };
}

export interface IAuthContext {
  auth: IAuthState;
  logout: () => void;
  login: (username: string) => void;
  authorizationHeader: () => IAuthRequestHeaders;
}

export interface IAuthStateProps {
  children: ReactNode;
}
