import { createAction, handleActions } from "redux-actions";
import contractAPI from "klaytn/contractAPI";
import { getWallet } from "utils/crypto";
// import ui from "utils/ui";
// import { feedParser } from "utils/misc";
// import { toast } from "react-toastify";
import { startLoading, finishLoading } from "./loading";
import { createRequestActionTypes } from "lib/createRequestSaga";
import { takeLatest, put, call } from "redux-saga/effects";
import { feedParser } from "utils/misc";

const [
  UPLOAD_MAKERS,
  UPLOAD_MAKERS_SUCCESS,
  UPLOAD_MAKERS_FAILURE,
] = createRequestActionTypes("makers/UPLOAD_MAKERS");

const [
  SET_MAKERS,
  SET_MAKERS_SUCCESS,
  SET_MAKERS_FAILURE,
] = createRequestActionTypes("makers/SET_MAKERS");

const getMakers = () => {
  return function* () {
    yield put(startLoading(SET_MAKERS));
    try {
      const totalMakersCount = yield call(
        contractAPI.methods.getTotalMakersCount().call,
      );

      if (!totalMakersCount) {
        return [];
      }

      const feed = [];

      for (let i = totalMakersCount; i > 0; i--) {
        const product = yield call(contractAPI.methods.getMakers(i).call);
        feed.push(product);
      }

      const parsedFeed = feedParser(feed);

      console.log("parsedFeed: ", parsedFeed);

      yield put({
        type: SET_MAKERS_SUCCESS,
        payload: parsedFeed,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: SET_MAKERS_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(SET_MAKERS));
  };
};

export const setMakers = createAction(SET_MAKERS);

const getMakersSaga = getMakers();

export function* makersSaga() {
  yield takeLatest(SET_MAKERS, getMakersSaga);
}

export const uploadMakersAction = (
  postId,
  title,
  description,
  price,
  targetCount,
  dDay,
) => dispatch => {
  dispatch(startLoading(UPLOAD_MAKERS));

  contractAPI.methods
    .createMakers(postId, title, description, price, targetCount, dDay)
    .send({
      from: getWallet().address,
      gas: "2000000",
    })
    .once("transactionHash", txHash => {
      console.log(`
        Sending a transaction...
        txHash: ${txHash}
      `);
    })
    .once("receipt", receipt => {
      dispatch({
        type: UPLOAD_MAKERS_SUCCESS,
        payload: receipt,
      });
      console.log(
        `
        Received receipt!
        receipt: 
      `,
        receipt,
      );

      // TODO
      // dispatch(setTransaction(receipt))

      // const tokenId = receipt.events.MakersCreated.returnValues[0];
      // dispatch(updateFeed(tokenId));

      dispatch(finishLoading(UPLOAD_MAKERS));
    })
    .once("error", e => {
      console.log(e);
      dispatch({ type: UPLOAD_MAKERS_FAILURE, payload: e, error: true });
      dispatch(finishLoading(UPLOAD_MAKERS));
      throw e;
    });
};

const initialState = {
  feed: null,
  error: null,
  receipt: null,
};

const makers = handleActions(
  {
    [UPLOAD_MAKERS_SUCCESS]: (state, { payload: receipt }) => ({
      ...state,
      receipt,
    }),
    [UPLOAD_MAKERS_FAILURE]: (state, { payload: e }) => ({
      ...state,
      hasWallet: false,
      error: e,
    }),
    [SET_MAKERS_SUCCESS]: (state, { payload: feed }) => ({
      ...state,
      feed,
    }),
    [SET_MAKERS_FAILURE]: (state, { payload: e }) => ({
      ...state,
      hasWallet: false,
      error: e,
    }),
  },
  initialState,
);

export default makers;
