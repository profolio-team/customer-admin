import { ReactNode } from "react";
import Keycloak from "keycloak-js";

export interface IAuthState {
  keycloak?: Keycloak.KeycloakInstance;
  authenticated: boolean;
}

export interface IAuthAction {
  type: string;
  payload?: IAuthState;
}

export interface IAuthContext {
  auth: IAuthState;
  logout: () => void;
  login: () => void;
}

export interface IAuthStateProps {
  children: ReactNode;
}
