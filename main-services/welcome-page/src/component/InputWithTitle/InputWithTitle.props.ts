import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface InputWithTitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  valuePlaceholder?: string;
  title: string;
}
