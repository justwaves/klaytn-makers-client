import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as txAPI from 'lib/api/tx';
import { takeLatest, call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'redux/modules/loading';
import { getAddress } from 'lib/crypto';

const [WRITE_TX, WRITE_TX_SUCCESS, WRITE_TX_FAILURE] = createRequestActionTypes(
  'tx/WRITE_TX',
);

const [
  SET_TX_LIST,
  SET_TX_LIST_SUCCESS,
  SET_TX_LIST_FAILURE,
] = createRequestActionTypes('tx/SET_TX_LIST');

export const writeTx = createAction(
  WRITE_TX,
  ({
    type,
    blockNumber,
    blockHash,
    from,
    to,
    gas,
    gasPrice,
    gasUsed,
    transactionHash,
    typeName,
    klay,
    TxFee,
    orderDate,
  }) => ({
    type,
    blockNumber,
    blockHash,
    from,
    to,
    gas,
    gasPrice,
    gasUsed,
    transactionHash,
    typeName,
    klay,
    TxFee,
    orderDate,
  }),
);

export const setTxList = createAction(SET_TX_LIST, ({ username }) => ({
  username,
}));

const writeTxSaga = createRequestSaga(WRITE_TX, txAPI.writeTx);

const setTxListSaga = () => {
  return function* (action) {
    yield put(startLoading(SET_TX_LIST));
    const username = action.payload;

    try {
      const response = yield call(txAPI.listTx, username);
      let newList = [];
      response.data.map(({ _doc }) => {
        newList.push(_doc);
        return null;
      });
      const address = yield call(getAddress);

      yield put({
        type: SET_TX_LIST_SUCCESS,
        payload: newList.filter(tx => tx.from === address),
        meta: response,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: SET_TX_LIST_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(SET_TX_LIST));
  };
};

export function* txSaga() {
  yield takeLatest(WRITE_TX, writeTxSaga);
  yield takeLatest(SET_TX_LIST, setTxListSaga());
}

const initialState = {
  txList: null,
  txError: null,
  receipt: null,
};

const write = handleActions(
  {
    [WRITE_TX]: state => ({
      ...state,
      txList: null,
      txError: null,
      receipt: null,
    }),
    [WRITE_TX_SUCCESS]: (state, { payload: tx }) => ({
      ...state,
      receipt: tx,
    }),
    [WRITE_TX_FAILURE]: (state, { payload: txError }) => ({
      ...state,
      txError,
    }),
    [SET_TX_LIST_SUCCESS]: (state, { payload: txList }) => ({
      ...state,
      txList,
    }),
    [SET_TX_LIST_FAILURE]: (state, { payload: txError }) => ({
      ...state,
      txError,
    }),
  },
  initialState,
);

export default write;
