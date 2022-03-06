import { Context, createContext, ReactNode, useContext } from "react";

interface ConfigContext {
  loading: boolean;
}

const configContext: Context<ConfigContext> = createContext<ConfigContext>({
  loading: true,
});

function useProviderConfig(): ConfigContext {
  // actions
  return { loading: false };
}

export function ConfigProvider(props: { children: ReactNode }): JSX.Element {
  const maintenanceConfig = useProviderConfig();
  return <configContext.Provider value={maintenanceConfig}>{props.children}</configContext.Provider>;
}
export const useConfig = (): ConfigContext => useContext(configContext);
