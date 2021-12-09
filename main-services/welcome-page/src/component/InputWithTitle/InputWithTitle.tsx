import { InputWithTitleProps } from './InputWithTitle.props';
import styles from './InputWithTitle.module.css';
import { Input } from '../Input/Input';


export const InputWithTitle = ({
                                 valuePlaceholder,
                                 title,
                                 ...props
                               }: InputWithTitleProps): JSX.Element => {
  return <div className={styles.wrapper}>
    <span className={styles.span}>{title}</span>
    <Input placeholder={valuePlaceholder} {...props}/>
  </div>;
};
