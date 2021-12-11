import React from "react";
import { Button } from "../../../component";
import styles from "./OnboardingPage.module.css";
import { Image } from "react-bootstrap";
import background from "../../../assets/images/background.png";
import logoWhite from "../../../assets/images/logoWhite.svg";

import { NavLink } from "react-router-dom";

export function OnboardingPage(): JSX.Element {
  return (
    <div>
      <div className={styles.bannerInnerItem} style={{ backgroundImage: `url(${background})` }}>
        <Image className={styles.logo} src={logoWhite} />
      </div>

      <div className={styles.container}>
        <h1 className={styles.h}>Present your experience professionally</h1>

        <p className={styles.p}>
          Profolio – a rapid portfolio-builder service with an assistant widget and detailed
          <br /> role-specific checklists to help users to reduce the time and effort needed to
          <br />
          create a portfolio or CV.
        </p>

        <NavLink to="/registration">
          <Button className={styles.mainActionButton} color={"blue"}>
            Create Account
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
