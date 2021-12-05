import React, { useReducer } from "react";

import { AlertContext } from "./alertContext";
import { alertReducer } from "./alertReducer";
import { IAlertStateProps } from "./alertTypes";
import { HIDE_ALERT, SHOW_ALERT } from "../types";

export const AlertState = ({ children }: IAlertStateProps) => {
  const [state, dispatch] = useReducer(alertReducer, {
    visible: false,
    text: "",
    type: "info",
  });

  const show = (text: string, type = "warning") => {
    dispatch({
      type: SHOW_ALERT,
      payload: { text, type },
    });
  };

  const hide = () => {
    dispatch({ type: HIDE_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{
        show,
        hide,
        alert: state,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
