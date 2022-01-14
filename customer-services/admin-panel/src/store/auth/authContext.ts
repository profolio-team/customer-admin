import { createContext } from "react";
import { IAuthContext } from "./auth.types";

const defaultState = {
  auth: {
    keycloak: undefined,
    authenticated: false,
  },
  login: (username: string) => {
    console.log(`Method does not implemented. Args: ${username}`);
  },
  logout: () => {
    console.log(`Method does not implemented. logout`);
  },

  authorizationHeader: () => ({
    headers: {
      Authorization: "authorizationHeader function does not implemented",
    },
  }),
};

export const AuthContext = createContext<IAuthContext>(defaultState);
