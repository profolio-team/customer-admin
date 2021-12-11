import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface WallpaperProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
