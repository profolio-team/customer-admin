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
  return (
    <configContext.Provider value={maintenanceConfig}>{props.children}</configContext.Provider>
  );
}
export const useConfig = (): ConfigContext => useContext(configContext);

export const SUPPORT_EMAIL = "fixiki@profolioteam.com";
export const ADMINISTRATOR_EMAIL = "m.jones@companyname.com";

interface CustomErrors {
  code: string;
  message: string;
  text: string;
}

export const errors: CustomErrors[] = [
  {
    code: "404",
    message: "Page not found",
    text: "Sorry. The page you are looking for has been removed or moved to somewhere else.",
  },
  {
    code: "403",
    message: "Access denied",
    text: "Sorry. You don’t have permission to access this page.",
  },
  {
    code: "500",
    message: "Unexpected error",
    text: "Sorry. We are facing an internal server error and fixing it already. Please try again later.",
  },
  {
    code: "503",
    message: "Service unavailable",
    text: "Sorry. Service is getting a tune-up. Please try again later.",
  },
];
