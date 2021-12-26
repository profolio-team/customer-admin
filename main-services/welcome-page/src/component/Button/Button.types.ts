import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  color?: "ghost" | "blue";
  form?: "round" | "square";
  angle?: boolean;
}
