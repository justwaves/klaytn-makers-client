import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "lib/createRequestSaga";
import * as txAPI from "lib/api/tx";
import { takeLatest } from "redux-saga/effects";

const [WRITE_TX, WRITE_TX_SUCCESS, WRITE_TX_FAILURE] = createRequestActionTypes(
  "tx/WRITE_TX",
);

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
  }),
);

const writeTxSaga = createRequestSaga(WRITE_TX, txAPI.writeTx);

export function* txSaga() {
  yield takeLatest(WRITE_TX, writeTxSaga);
}

const initialState = {
  tx: null,
  txError: null,
};

const write = handleActions(
  {
    [WRITE_TX]: state => ({
      ...state,
      tx: null,
      txError: null,
    }),
    [WRITE_TX_SUCCESS]: (state, { payload: tx }) => ({
      ...state,
      tx,
    }),
    [WRITE_TX_FAILURE]: (state, { payload: txError }) => ({
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
