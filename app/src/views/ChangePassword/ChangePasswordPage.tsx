import { useAuth } from "../../hooks/useAuth";
import { ChangePasswordForm } from "./ChangePasswordForm";

export function ChangePasswordPage(): JSX.Element {
  const { user } = useAuth();

  return user ? <ChangePasswordForm user={user} /> : <>Loading...</>;
}
