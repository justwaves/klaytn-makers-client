import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as txAPI from 'lib/api/tx';
import { takeLatest } from 'redux-saga/effects';

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
  }),
);

export const setTxList = createAction(SET_TX_LIST, ({ username }) => ({
  username,
}));

const writeTxSaga = createRequestSaga(WRITE_TX, txAPI.writeTx);
const setTxListSaga = createRequestSaga(SET_TX_LIST, txAPI.listTx);

export function* txSaga() {
  yield takeLatest(WRITE_TX, writeTxSaga);
  yield takeLatest(SET_TX_LIST, setTxListSaga);
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
    [SET_TX_LIST]: state => ({
      ...state,
      txList: null,
      txError: null,
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

// const dd = {
//   "type": "type1",
//   "blockNumber": 11111,
//   "blockHash": "blockHash1",
//   "from": "from1",
//   "to": "to1",
//   "gas": "gas1",
//   "gasPrice": "gasPrice1",
//   "gasUsed": 1111,
//   "transactionHash": "transactionHash1",
// };
