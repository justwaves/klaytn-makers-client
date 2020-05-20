import caver from 'klaytn/caver';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put, call } from 'redux-saga/effects';
import { createRequestActionTypes } from 'lib/createRequestSaga';
import { startLoading, finishLoading } from './loading';

const [
  WALLET_LOGIN,
  WALLET_LOGIN_SUCCESS,
  WALLET_LOGIN_FAILURE,
] = createRequestActionTypes('wallet/WALLET_LOGIN');

const [
  WALLET_LOGOUT,
  WALLET_LOGOUT_SUCCESS,
  WALLET_LOGOUT_FAILURE,
] = createRequestActionTypes('wallet/WALLET_LOGOUT');

const SET_BALANCE = 'wallet/SET_BALANCE';

function integrateWallet() {
  return function* (action) {
    yield put(startLoading(WALLET_LOGIN));

    const { privateKey } = action.payload;

    try {
      const walletInstance = caver.klay.accounts.privateKeyToAccount(
        privateKey,
      );
      caver.klay.accounts.wallet.add(walletInstance);

      sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance));

      yield put({
        type: WALLET_LOGIN_SUCCESS,
        payload: {
          privateKey,
          address: walletInstance.address,
        },
      });
      const result = yield call(caver.klay.getBalance, walletInstance.address);
      const balance = caver.utils.fromWei(result, 'ether');
      yield put({
        type: SET_BALANCE,
        payload: balance,
      });
    } catch (e) {
      yield put({ type: WALLET_LOGIN_FAILURE, payload: e, error: true });
    }
    yield put(finishLoading(WALLET_LOGIN));
  };
}

function removeWallet() {
  return function* () {
    yield put(startLoading(WALLET_LOGOUT));
    try {
      caver.klay.accounts.wallet.clear();
      sessionStorage.removeItem('walletInstance');
      yield put({
        type: WALLET_LOGOUT_SUCCESS,
      });
      yield put(finishLoading(WALLET_LOGOUT));
    } catch (e) {
      yield put({
        type: WALLET_LOGOUT_FAILURE,
        payload: e,
        error: true,
      });
      yield put(finishLoading(WALLET_LOGOUT));
      throw e;
    }
  };
}

export const walletLogin = createAction(WALLET_LOGIN, privateKey => ({
  privateKey,
}));

export const walletLogout = createAction(WALLET_LOGOUT);
export const setBalance = createAction(SET_BALANCE, ({ balance }) => ({
  balance,
}));

const walletLoginSaga = integrateWallet();
const walletLogoutSaga = removeWallet();

export function* walletSaga() {
  yield takeLatest(WALLET_LOGIN, walletLoginSaga);
  yield takeLatest(WALLET_LOGOUT, walletLogoutSaga);
}

const initialState = {
  hasWallet: !!sessionStorage.getItem('walletInstance'),
  privateKey: null,
  address: null,
  balance: null,
  error: null,
};

const wallet = handleActions(
  {
    [WALLET_LOGIN_SUCCESS]: (state, { payload: { privateKey, address } }) => ({
      ...state,
      hasWallet: true,
      privateKey,
      address,
    }),
    [WALLET_LOGIN_FAILURE]: (state, { payload: e }) => ({
      ...state,
      hasWallet: false,
      error: e,
    }),
    [WALLET_LOGOUT_SUCCESS]: state => ({
      ...state,
      hasWallet: false,
      privateKey: null,
      address: null,
    }),
    [WALLET_LOGOUT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [SET_BALANCE]: (state, { payload: balance }) => ({
      ...state,
      balance,
    }),
  },
  initialState,
);

export default wallet;
