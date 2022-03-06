import { ReactNode } from "react";

export interface IAuthState {
  authenticated: boolean;
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
