import { ReactNode } from "react";

export interface IAlertState {
  visible?: boolean;
  text?: string;
  type?: string;
}

export interface IAlertAction {
  type: string;
  payload?: IAlertState;
}

export interface IAlertContext {
  alert: IAlertState;
  hide?: () => void;
  show?: (text: string, type: string) => void;
}

export interface IAlertStateProps {
  children: ReactNode;
}
