import { HIDE_ALERT, SHOW_ALERT } from "../types";
import { IAlertState, IAlertAction } from "./alertTypes";

interface IHandlers {
  [key: string]: (state: IAlertState, action: IAlertAction) => IAlertState;
}

const handlers = {
  [SHOW_ALERT]: (state: IAlertState, { payload }: IAlertAction) => ({
    ...payload,
    visible: true,
  }),
  [HIDE_ALERT]: (state: IAlertState) => ({ ...state, visible: false }),
  DEFAULT: (state: IAlertState) => state,
} as IHandlers;

export const alertReducer = (
  state: IAlertState,
  action: IAlertAction
): IAlertState => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
