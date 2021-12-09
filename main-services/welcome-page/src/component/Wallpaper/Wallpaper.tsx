import { WallpaperProps } from "./Wallpaper.props";
import styles from "./Wallpaper.module.css";
import wallpaper from "./Background.png";
import { Image } from "react-bootstrap";
import logo from "../Content-welcome-page/logo.svg";
import React from "react";
import { Button } from "../Button/Button";
import { NavLink } from "react-router-dom";

export const Wallpaper = ({ children }: WallpaperProps): JSX.Element => {
  return (
    <div className={styles.bannerInnerItem} style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className={styles.button}>
        <NavLink to="/">
          <Button angle={true} form={"round"} />
        </NavLink>
      </div>
      <Image src={logo} />
      {children}
    </div>
  );
};
