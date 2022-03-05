import { LOGIN, LOGOUT } from "./authReducerTypes";

import { IAuthState, IAuthAction } from "./auth.types";

interface IHandlers {
  [key: string]: (state: IAuthState, action: IAuthAction) => IAuthState;
}

const handlers = {
  [LOGIN]: (state: IAuthState, { payload }: IAuthAction) => {
    return {
      ...state,
      ...payload,
    };
  },
  [LOGOUT]: (state: IAuthState) => ({ ...state, authenticated: false }),
  DEFAULT: (state: IAuthState) => state,
} as IHandlers;

export const authReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
