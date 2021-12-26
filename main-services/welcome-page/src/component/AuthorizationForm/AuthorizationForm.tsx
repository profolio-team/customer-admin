import { AuthorizationFormProps } from "./AuthorizationForm.types";
import { CreateAccountAuthorizationForm } from "./CreateAccount/CreateAccountAuthorizationForm";
import { SignInAuthorizationForm } from "./SignIn/SignInAuthorizationForm";

export const AuthorizationForm = ({ form }: AuthorizationFormProps): JSX.Element => {
  const components = {
    CreateAccount: <CreateAccountAuthorizationForm />,
    SignIn: <SignInAuthorizationForm />,
  };

  return components[form];
};
