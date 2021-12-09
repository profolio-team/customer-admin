import styles from '../AuthorizationForm.module.css';
import React from 'react';
import { Button } from '../../Button/Button';
import { InputWithTitle } from '../../InputWithTitle/InputWithTitle';

export const RecoveryPasswordAuthorizationForm = (): JSX.Element => {




  return <div className={styles.wrapper}>
    <h1 className={styles.h1}>Password Recovery</h1>

    <span className={styles.forgotSpan}>Tell us your email so we can send you a reset link</span>

    <InputWithTitle title={'Email'} valuePlaceholder={'Email..'}/>

    <Button color={'blue'} className={styles.button}>Recover password</Button>

  </div>;

};
