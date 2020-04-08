import { createAction, handleActions } from "redux-actions";

const LOGIN = "auth/LOGIN";

export const loginAction = createAction(LOGIN);

const initialState = {};

const auth = handleActions(
  {
    [LOGIN]: (state, action) => state,
  },
  initialState,
);

export default auth;
