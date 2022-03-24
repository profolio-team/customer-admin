import { useAuth } from "../../hooks/useAuth";
import { StaticHeader } from "./StaticHeader";
import { UserHeader } from "./UserHeader";

export function Header(): JSX.Element {
  const { isAuthorized } = useAuth();

  return isAuthorized ? <UserHeader /> : <StaticHeader />;
}
