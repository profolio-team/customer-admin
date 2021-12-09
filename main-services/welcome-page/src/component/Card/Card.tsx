import { CardProps } from './Card.props';
import styles from './Card.module.css';

export const Card = ({
                       children,
                       className,
                       ...props
                     }: CardProps): JSX.Element => {
  return <div className={styles.card}>
    {children}
  </div>;

};
