import { Header } from "../../component";
import styles from "./CheckYourEmail.module.css";

export function CheckYourEmail(): JSX.Element {
  return (
    <div>
      <Header />
      <div className={styles.infoContainer}>
        <h2>Check your email</h2>
        <p>We sent confirmation link to your email box</p>
      </div>
    </div>
  );
}
