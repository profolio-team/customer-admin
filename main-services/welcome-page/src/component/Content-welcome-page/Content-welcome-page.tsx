import React from 'react';
import { Button } from '../Button/Button';
import wallpaper from './wallpaper.svg';
import styles from './Content-welcome-page.module.css';
import logo from './logo.svg';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


export default function ContentWelcomePage(): JSX.Element {

  return <div>

    <div className={styles.bannerInnerItem} style={{ backgroundImage: `url(${wallpaper})` }}>
      <Image className={styles.logo} src={logo}/>
    </div>

    <div className={styles.container}>

      <h1 className={styles.h}>Present your experience professionally</h1>

      <p className={styles.p}>Profolio – a rapid portfolio-builder service with an assistant widget and detailed
        <br/> role-specific checklists to help users to reduce the time and effort needed to
        <br/>create a portfolio or CV.
      </p>

      <NavLink to="/registration">
        <Button className={styles.butt} color={'blue'}>Create Account</Button>
      </NavLink>

    </div>

  </div>;
}
