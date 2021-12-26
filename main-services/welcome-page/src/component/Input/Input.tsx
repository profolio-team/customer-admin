import { FC } from "react";
import { InputProps } from "./Input.types";
import styles from "./Input.module.css";

export const Input: FC<InputProps> = ({ title, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.span}>{title}</span>
      <input className={styles.input} {...props} />
    </div>
  );
};
