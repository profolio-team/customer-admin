import { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";
import classNames from "classnames";
import { Image } from "react-bootstrap";
import AngleIcon from "../../assets/images/angle.svg";

export const Button = ({ color = "ghost", form = "square", angle = false, children, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(className, styles.button, {
        [styles.blue]: color == "blue",
        [styles.ghost]: color == "ghost",
        [styles.round]: form == "round",
      })}
      {...props}
    >
      {angle ? (
        <span className={styles.angle}>
          <Image src={AngleIcon} />
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
