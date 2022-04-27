import { Context, createContext, ReactNode, useContext } from "react";

interface ConfigContext {
  loading: boolean;
  emails: {
    support: string;
    admin: string;
  };
}

const configContext: Context<ConfigContext> = createContext<ConfigContext>({
  loading: true,
  emails: { support: "fixiki@profolioteam.com", admin: "m.jones@companyname.com" },
});

function useProviderConfig(): ConfigContext {
  // actions
  return {
    loading: false,
    emails: { support: "fixiki@profolioteam.com", admin: "m.jones@companyname.com" },
  };
}

export function ConfigProvider(props: { children: ReactNode }): JSX.Element {
  const maintenanceConfig = useProviderConfig();
  return (
    <configContext.Provider value={maintenanceConfig}>{props.children}</configContext.Provider>
  );
}
export const useConfig = (): ConfigContext => useContext(configContext);
