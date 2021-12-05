import { createContext } from "react";
import { IAlertContext } from "./alert.types";

const defaultState = {
  alert: {
    visible: false,
    text: "",
    type: "info",
  },
};

export const AlertContext = createContext<IAlertContext>(defaultState);
