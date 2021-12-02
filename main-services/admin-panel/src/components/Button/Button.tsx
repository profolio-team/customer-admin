import React from "react";
import cn from 'classnames';
import styles from './Button.module.css';

export function Button() {
  return <button className={cn(styles.button)}>Hi</button>;
}
