import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';


export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  color?: 'ghost' | 'blue';
  form?: 'round' | 'square';
  angle?: boolean;
}
