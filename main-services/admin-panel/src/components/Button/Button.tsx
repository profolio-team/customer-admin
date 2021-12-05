import cn from "classnames";
import styles from "./Button.module.css";
import { IButtonProps } from "./Button.props";

export const Button = ({
  children,
  className,
  ...props
}: IButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={cn("btn", "btn-primary", styles.button, className)}
      {...props}
    >
      {children}
    </button>
  );
};
