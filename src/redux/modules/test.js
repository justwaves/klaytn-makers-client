import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import { createRequestActionTypes } from "lib/createRequestSaga";
import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "redux/modules/loading";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "auth/LOGIN",
);

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

// authApi.login = ({ username, password }) =>
//   apiClient.post("/api/auth/login", { username, password });

const loginSaga = createRequestSaga(authApi.login);

function createRequestSaga(request) {
  return function* (action) {
    yield put(startLoading(LOGIN));
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: LOGIN_SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: LOGIN_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(LOGIN));
  };
}

export function* authSaga() {
  console.log("authSaga");
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
