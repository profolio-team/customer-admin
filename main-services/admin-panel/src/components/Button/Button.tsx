import cn from "classnames";
import styles from "./Button.module.css";
import { IButtonProps } from "./Button.props";

export const Button = ({
  children,
  className,
  ...props
}: IButtonProps): JSX.Element => {
  return (
    <button className={cn(styles.button, className)} {...props}>
      {children}
    </button>
  );
};
