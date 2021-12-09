import { InputProps } from './Input.props';
import styles from './Input.module.css';
import classNames from 'classnames';


export const Input = ({

                         className,
                         ...props
                       }: InputProps): JSX.Element => {
  return <input className={classNames(className, styles.input)} {...props} type="text"/>;
};
