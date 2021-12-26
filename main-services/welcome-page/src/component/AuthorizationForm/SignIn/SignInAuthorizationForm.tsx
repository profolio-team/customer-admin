import React, { useContext, useState } from "react";
import styles from "../AuthorizationForm.module.css";
import { Button, Input } from "../../";
import { AuthContext } from "../../../store";

export const SignInAuthorizationForm = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <form>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Sign In</h1>

        <Input
          type="email"
          title={"Email"}
          placeholder={"admin@nameofcompany.com"}
          name="email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          value={email}
        />

        <Button
          color={"blue"}
          type="submit"
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            login(email);
          }}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};
