import { createContext } from "react";
import { IAuthContext } from "./auth.types";

const defaultState = {
  auth: {
    Keycloak: null,
    authenticated: false,
  },
  login: (username: string) => {
    console.log(`Method does not implemented. Args: ${username}`);
  },
  logout: () => {
    console.log(`Method does not implemented. logout`);
  },
  signup: async (email: string, domain: string) => {
    return `Method does not implemented. Args: ${email}, ${domain}`;
  },

  authorizationHeader: () => ({
    headers: {
      Authorization: "authorizationHeader function does not implemented",
    },
  }),
};

export const AuthContext = createContext<IAuthContext>(defaultState);
