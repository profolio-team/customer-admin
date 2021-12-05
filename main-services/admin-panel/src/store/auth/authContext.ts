import { createContext } from "react";
import { IAuthContext } from "./auth.types";

const defaultState = {
  auth: {
    Keycloak: null,
    authenticated: false,
  },
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultState);
