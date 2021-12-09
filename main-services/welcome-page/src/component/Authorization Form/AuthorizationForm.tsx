import { AuthorizationFormProps } from './AuthorizationForm.props';
import React from 'react';
import { CreateAccountAuthorizationForm } from './CreateAccount/CreateAccountAuthorizationForm';
import { RecoveryPasswordAuthorizationForm } from './RecoveryPassword/RecoveryPasswordAuthorizationForm';
import { SignInAuthorizationForm } from './SignIn/SignInAuthorizationForm';

export const AuthorizationForm = ({ form }: AuthorizationFormProps): JSX.Element => {

  const components = {

    'CreateAccount': <CreateAccountAuthorizationForm/>,

    'RecoveryPassword': <RecoveryPasswordAuthorizationForm/>,

    'SignIn': <SignInAuthorizationForm/>,

  };

  return components[form];

};
