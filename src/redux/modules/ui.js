import { createAction, handleActions } from "redux-actions";

const SHOW_MODAL = "ui/SHOW_MODAL";
const HIDE_MODAL = "ui/HIDE_MODAL";
const SHOW_TOAST = "ui/SHOW_TOAST";
const HIDE_TOAST = "ui/HIDE_TOAST";

export const showModal = createAction(SHOW_MODAL, content => content);

export const hideModal = createAction(HIDE_MODAL);

export const showToast = createAction(SHOW_TOAST, toast => toast);

export const hideToast = createAction(HIDE_TOAST);

const initialState = {
  modal: null,
  toast: null,
};

const ui = handleActions(
  {
    [SHOW_MODAL]: (state, { payload: content }) => ({
      ...state,
      modal: content,
    }),
    [HIDE_MODAL]: state => ({
      ...state,
      modal: null,
    }),
    [SHOW_TOAST]: (state, { payload: toast }) => ({
      ...state,
      toast,
    }),
    [HIDE_TOAST]: state => ({
      ...state,
      toast: null,
    }),
  },
  initialState,
);

export default ui;
