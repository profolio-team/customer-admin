import { AuthorizationFormProps } from './AuthorizationForm.props';
import styles from './AuthorizationForm.module.css';
import React from 'react';
import { InputWithTitle } from '../InputWithTitle/InputWithTitle';
import { Button } from '../Button/Button';
import { CreateAccountAuthorizationForm } from './CreateAccount/CreateAccountAuthorizationForm';
import { RecoveryPasswordAuthorizationForm } from './RecoveryPassword/RecoveryPasswordAuthorizationForm';
import { SignInAuthorizationForm } from './SignIn/SignInAuthorizationForm';

export const AuthorizationForm = ({
                                   form,
                                   className,
                                   ...props
                                 }: AuthorizationFormProps): JSX.Element => {

  switch (form) {
    case 'CreateAccount':
      return <CreateAccountAuthorizationForm/>;
    case 'RecoveryPassword':
      return <RecoveryPasswordAuthorizationForm/>;
    case 'signIn':
      return <SignInAuthorizationForm/>;
  }

};
