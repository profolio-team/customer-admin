import React from "react";
import { Button } from "../";
import { WallpaperProps } from "./Wallpaper.types";
import styles from "./Wallpaper.module.css";
import { Image } from "react-bootstrap";
import background from "../../assets/images/background.png";
import logo from "../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";

export const Wallpaper = ({ children }: WallpaperProps): JSX.Element => {
  return (
    <div className={styles.bannerInnerItem} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.button}>
        <NavLink to="/">
          <Button angle={true} form={"round"} />
        </NavLink>
      </div>
      <Image src={logo} />
      <div className={styles.item}>
        {children}
      </div>

    </div>
  );
};
