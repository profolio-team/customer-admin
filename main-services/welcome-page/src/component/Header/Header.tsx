import styles from "./Header.module.css";
import { Button } from "../Button/Button";
import { NavLink } from "react-router-dom";

export const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="logo.svg" />
      </div>

      <div className={styles.headerRight}>
        <NavLink to="/registration">
          <Button color={"ghost"}>Create Account</Button>
        </NavLink>
        <span>
          <a href="">Examples</a>
        </span>
        <span>
          {" "}
          <NavLink to="/sign-in">Sign In</NavLink>
        </span>
      </div>
    </div>
  );
};
