import { createAction, handleActions } from "redux-actions";
import contractAPI from "klaytn/contractAPI";
import { getWallet } from "utils/crypto";
import { startLoading, finishLoading } from "./loading";
import { createRequestActionTypes } from "lib/createRequestSaga";
import { takeLatest, put, call, select } from "redux-saga/effects";
import { feedParser } from "utils/misc";
import { writeTx } from "./tx";
// import ui from "utils/ui";

const [
  UPLOAD_MAKERS,
  UPLOAD_MAKERS_SUCCESS,
  UPLOAD_MAKERS_FAILURE,
] = createRequestActionTypes("makers/UPLOAD_MAKERS");

const [
  UPDATE_FEED,
  UPDATE_FEED_SUCCESS,
  UPDATE_FEED_FAILURE,
] = createRequestActionTypes("makers/UPDATE_FEED");

const [SET_FEED, SET_FEED_SUCCESS, SET_FEED_FAILURE] = createRequestActionTypes(
  "makers/SET_FEED",
);

const [
  SET_MAKERS,
  SET_MAKERS_SUCCESS,
  SET_MAKERS_FAILURE,
] = createRequestActionTypes("makers/SET_MAKERS");

const UNLOAD_MAKERS = "makers/UNLOAD_MAKERS";

export const uploadMakersSaga = () => {
  return function* (action) {
    yield put(startLoading(UPLOAD_MAKERS));
    yield put(setFeed());
    const { postId, title, price, targetCount, dDay } = action.payload;

    console.log(postId, title, price, targetCount, dDay);
    try {
      const receipt = yield call(
        contractAPI.methods.createMakers(
          postId,
          title,
          price,
          targetCount,
          dDay,
        ).send,
        {
          from: getWallet().address,
          gas: "2000000",
        },
      );

      console.log(
        `
          Received receipt!
          receipt:
        `,
        receipt,
      );

      yield put({
        type: UPLOAD_MAKERS_SUCCESS,
        payload: receipt,
      });

      yield put(
        writeTx({
          type: receipt.type,
          blockNumber: receipt.blockNumber,
          blockHash: receipt.blockHash,
          from: receipt.from,
          to: receipt.to,
          gas: receipt.gas,
          gasPrice: receipt.gasPrice,
          gasUsed: receipt.gasUsed,
          transactionHash: receipt.transactionHash,
        }),
      );

      const makersId = receipt.events.MakersCreated.returnValues[0];
      yield put(updateFeed(makersId));

      // TODO: dispatch(setTransaction(receipt))
    } catch (e) {
      yield put({
        type: UPLOAD_MAKERS_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(UPLOAD_MAKERS));
  };
};

const updateFeedSaga = () => {
  return function* (action) {
    yield put(startLoading(UPDATE_FEED));
    try {
      const makersId = action.payload;
      const newMakers = yield call(
        contractAPI.methods.getMakersByMakersId(makersId).call,
      );

      const { feed } = yield select(state => state.makers);
      const newFeed = [feedParser(newMakers), ...feed];

      yield put({
        type: UPDATE_FEED_SUCCESS,
        payload: newFeed,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: UPDATE_FEED_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(UPDATE_FEED));
  };
};

const setFeedSaga = () => {
  return function* () {
    yield put(startLoading(SET_FEED));
    try {
      const totalMakers = yield call(contractAPI.methods.getTotalMakers().call);

      console.log(totalMakers);
      if (!totalMakers) {
        return [];
      }

      const feed = feedParser(totalMakers).reverse();

      yield put({
        type: SET_FEED_SUCCESS,
        payload: feed,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: SET_FEED_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(SET_FEED));
  };
};

const setMakersSaga = () => {
  return function* (action) {
    yield put(startLoading(SET_MAKERS));

    const postId = action.payload;

    try {
      const product = yield call(
        contractAPI.methods.getMakersByPostId(postId).call,
      );

      if (!product) {
        console.log("상품을 불러 올 수 없습니다.");
        return;
      }

      console.log(product);

      const feed = [];

      feed.push(product);

      const makers = feedParser(feed);

      yield put({
        type: SET_MAKERS_SUCCESS,
        payload: makers,
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

export const uploadMakers = createAction(UPLOAD_MAKERS);
export const updateFeed = createAction(UPDATE_FEED, makersId => makersId);
export const setFeed = createAction(SET_FEED);
export const setMakers = createAction(SET_MAKERS);
export const unloadMakers = createAction(UNLOAD_MAKERS);

export function* makersSaga() {
  yield takeLatest(UPLOAD_MAKERS, uploadMakersSaga());
  yield takeLatest(UPDATE_FEED, updateFeedSaga());
  yield takeLatest(SET_FEED, setFeedSaga());
  yield takeLatest(SET_MAKERS, setMakersSaga());
}

const initialState = {
  feed: null,
  makers: null,
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
      error: e,
    }),

    [UPDATE_FEED_SUCCESS]: (state, { payload: newFeed }) => ({
      ...state,
      feed: newFeed,
    }),
    [UPDATE_FEED_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [SET_FEED_SUCCESS]: (state, { payload: feed }) => ({
      ...state,
      feed,
    }),
    [SET_FEED_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [SET_MAKERS_SUCCESS]: (state, { payload: makers }) => ({
      ...state,
      makers,
    }),
    [SET_MAKERS_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [UNLOAD_MAKERS]: () => initialState,
  },
  initialState,
);

export default makers;
