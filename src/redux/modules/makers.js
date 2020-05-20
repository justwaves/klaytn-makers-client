import { createAction, handleActions } from 'redux-actions';
import contractAPI from 'klaytn/contractAPI';
import { getWallet } from 'lib/crypto';
import { startLoading, finishLoading } from './loading';
import { createRequestActionTypes } from 'lib/createRequestSaga';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { feedParser } from 'lib/parser';
import caver from 'klaytn/caver';
import { writeTx, setTxList } from './tx';
import ui from 'lib/ui';

const [
  UPLOAD_MAKERS,
  UPLOAD_MAKERS_SUCCESS,
  UPLOAD_MAKERS_FAILURE,
] = createRequestActionTypes('makers/UPLOAD_MAKERS');

const [
  UPDATE_FEED,
  UPDATE_FEED_SUCCESS,
  UPDATE_FEED_FAILURE,
] = createRequestActionTypes('makers/UPDATE_FEED');

const [SET_FEED, SET_FEED_SUCCESS, SET_FEED_FAILURE] = createRequestActionTypes(
  'makers/SET_FEED',
);

const [
  SET_MAKERS,
  SET_MAKERS_SUCCESS,
  SET_MAKERS_FAILURE,
] = createRequestActionTypes('makers/SET_MAKERS');

const CHECK_STATE = 'makers/CHECK_STATE';
const UNLOAD_MAKERS = 'makers/UNLOAD_MAKERS';

export const uploadMakersSaga = () => {
  return function* (action) {
    yield put(startLoading(UPLOAD_MAKERS));
    yield put(setFeed());
    const { postId, title, price, targetCount, dDay } = action.payload;

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
          gas: '5000000',
        },
      );

      console.log('receipt: ', receipt);
      yield put(setMakers(postId));

      ui.showToast({
        status: receipt.status ? 'success' : 'fail',
        message: `상품등록에 성공하였습니다 (block #${receipt.blockNumber})`,
        link: receipt.transactionHash,
        txHash: receipt.transactionHash,
      });

      yield put({
        type: UPLOAD_MAKERS_SUCCESS,
        payload: receipt,
      });

      const gasPriceToKlay = yield call(caver.utils.fromPeb, receipt.gasPrice);
      const TxFee = gasPriceToKlay * receipt.gasUsed;

      yield put(
        writeTx({
          ...receipt,
          typeName: '상품 등록',
          klay: 0,
          TxFee: TxFee * -1,
        }),
      );

      const makersId = receipt.events.MakersCreated.returnValues[0];
      yield put(updateFeed(makersId));
    } catch (e) {
      ui.showToast({
        status: 'fail',
        message: `상품등록에 실패하였습니다`,
        error: e,
      });
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

      const { username } = JSON.parse(localStorage.getItem('user'));
      yield put(setTxList({ username }));
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
        console.log('상품을 불러 올 수 없습니다.');
        return;
      }
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

const checkStateSaga = () => {
  return function* () {
    yield put(startLoading(CHECK_STATE));
    try {
      const receipt = yield call(contractAPI.methods.checkState().send, {
        from: process.env.REACT_APP_WALLET_ADDRESS,
        gas: '30000000',
      });
      console.log('checkState: ', receipt);
      yield put(setFeed());
    } catch (e) {
      console.log('error: ', e);
    }
    yield put(finishLoading(CHECK_STATE));
  };
};

export const uploadMakers = createAction(UPLOAD_MAKERS);
export const updateFeed = createAction(UPDATE_FEED, makersId => makersId);
export const setFeed = createAction(SET_FEED);
export const setMakers = createAction(SET_MAKERS);
export const unloadMakers = createAction(UNLOAD_MAKERS);
export const checkState = createAction(CHECK_STATE);

export function* makersSaga() {
  yield takeLatest(UPLOAD_MAKERS, uploadMakersSaga());
  yield takeLatest(UPDATE_FEED, updateFeedSaga());
  yield takeLatest(SET_FEED, setFeedSaga());
  yield takeLatest(SET_MAKERS, setMakersSaga());
  yield takeLatest(CHECK_STATE, checkStateSaga());
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
