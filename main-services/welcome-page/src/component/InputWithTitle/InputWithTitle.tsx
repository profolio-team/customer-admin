import { InputWithTitleProps } from "./InputWithTitle.types";
import styles from "./InputWithTitle.module.css";
import { Input } from "../";

export const InputWithTitle = ({ valuePlaceholder, title, ...props }: InputWithTitleProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.span}>{title}</span>
      <Input placeholder={valuePlaceholder} {...props} />
    </div>
  );
};
