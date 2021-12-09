import styles from '../AuthorizationForm.module.css';
import React from 'react';
import { Button } from '../../Button/Button';
import { InputWithTitle } from '../../InputWithTitle/InputWithTitle';
import { NavLink } from 'react-router-dom';

export const SignInAuthorizationForm = (): JSX.Element => {


  return <div className={styles.wrapper}>

    <h1 className={styles.title}>Sign In</h1>

    <InputWithTitle title={'Email'} valuePlaceholder={'Email..'}/>

    <InputWithTitle title={'Password'} valuePlaceholder={'Password..'}/>
    <NavLink to={'/recovery-password'}>
      <span>Forgot password?</span>
    </NavLink>

    <div className={styles.checkboxContainer}>
      <input type={'checkbox'}/>
      <span>Remember me</span>
    </div>

    <Button color={'blue'} className={styles.button}>Sign In</Button>

  </div>;

};
