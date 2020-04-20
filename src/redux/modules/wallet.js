import caver from "klaytn/caver";
import { handleActions } from "redux-actions";
import { createRequestActionTypes } from "lib/createRequestSaga";
import { startLoading, finishLoading } from "./loading";

const [
  INTEGRATE_WALLET,
  INTEGRATE_WALLET_SUCCESS,
  INTEGRATE_WALLET_FAILURE,
] = createRequestActionTypes("wallet/INTEGRATE_WALLET");

const [
  REMOVE_WALLET,
  REMOVE_WALLET_SUCCESS,
  REMOVE_WALLET_FAILURE,
] = createRequestActionTypes("wallet/REMOVE_WALLET");

export const integrateWallet = privateKey => async dispatch => {
  dispatch(startLoading(INTEGRATE_WALLET));

  try {
    const walletInstance = await caver.klay.accounts.privateKeyToAccount(
      privateKey,
    );
    await caver.klay.accounts.wallet.add(walletInstance);
    sessionStorage.setItem("walletInstance", JSON.stringify(walletInstance));

    dispatch({
      type: INTEGRATE_WALLET_SUCCESS,
      payload: {
        privateKey,
        address: walletInstance.address,
      },
    });
    dispatch(finishLoading(INTEGRATE_WALLET));
  } catch (e) {
    dispatch({ type: INTEGRATE_WALLET_FAILURE, payload: e, error: true });
    dispatch(finishLoading(INTEGRATE_WALLET));
    throw e;
  }
};

export const removeWallet = () => async dispatch => {
  dispatch(startLoading(REMOVE_WALLET));
  try {
    await caver.klay.accounts.wallet.clear();
    sessionStorage.removeItem("walletInstance");
    dispatch({
      type: REMOVE_WALLET_SUCCESS,
    });
    dispatch(finishLoading(REMOVE_WALLET));
  } catch (e) {
    dispatch({
      type: REMOVE_WALLET_FAILURE,
      payload: e,
      error: true,
    });
    dispatch(finishLoading(REMOVE_WALLET));
    throw e;
  }
};

const initialState = {
  hasWallet: !!sessionStorage.getItem("walletInstance"),
  privateKey: null,
  address: null,
  error: null,
};

const wallet = handleActions(
  {
    [INTEGRATE_WALLET_SUCCESS]: (
      state,
      { payload: { privateKey, address } },
    ) => ({
      ...state,
      hasWallet: true,
      privateKey,
      address,
    }),
    [INTEGRATE_WALLET_FAILURE]: (state, { payload: e }) => ({
      ...state,
      hasWallet: false,
      error: e,
    }),
    [REMOVE_WALLET_SUCCESS]: state => ({
      ...state,
      hasWallet: false,
      privateKey: null,
      address: null,
    }),
    [REMOVE_WALLET_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
  },
  initialState,
);

export default wallet;
