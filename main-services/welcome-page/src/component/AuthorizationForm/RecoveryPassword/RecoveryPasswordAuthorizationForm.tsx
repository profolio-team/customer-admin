import React from "react";
import styles from "../AuthorizationForm.module.css";
import { Button, InputWithTitle } from "../../";

export const RecoveryPasswordAuthorizationForm = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Password Recovery</h1>

      <span className={styles.forgotSpan}>Tell us your email so we can send you a reset link</span>

      <InputWithTitle title={"Email"} valuePlaceholder={"Email.."} />

      <Button color={"blue"} className={styles.button}>
        Recover password
      </Button>
    </div>
  );
};
