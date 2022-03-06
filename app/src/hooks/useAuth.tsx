import { Context, createContext, ReactNode, useContext } from "react";

interface AuthContext {
  loading: boolean;
  isAuthorized: boolean;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  loading: true,
  isAuthorized: false,
});

function useProviderConfig(): AuthContext {
  // actions
  return { isAuthorized: true, loading: true };
}

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const maintenanceConfig = useProviderConfig();
  return <authContext.Provider value={maintenanceConfig}>{props.children}</authContext.Provider>;
}
export const useConfig = (): AuthContext => useContext(authContext);
