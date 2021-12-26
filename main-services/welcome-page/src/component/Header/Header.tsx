import styles from "./Header.module.css";
import { Button } from "../";
import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";
import logoWithText from "../../assets/images/logoWithText.svg";

export const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src={logoWithText} />
      </div>

      <div className={styles.headerRight}>
        <NavLink to="/registration">
          <Button color={"ghost"}>Create Account</Button>
        </NavLink>
        <span>
          <a href="">Examples</a>
        </span>
        <span>
          <NavLink to="/sign-in">Sign In</NavLink>
        </span>
      </div>
    </div>
  );
};
