import { createAction, handleActions } from 'redux-actions';
import contractAPI from 'klaytn/contractAPI';
import { getWallet } from 'lib/crypto';
import { startLoading, finishLoading } from './loading';
import { createRequestActionTypes } from 'lib/createRequestSaga';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import caver from 'klaytn/caver';
import { feedParser } from 'lib/parser';
import { writeTx, setTxList } from './tx';
import ui from 'lib/ui';
import { setMakers } from 'redux/modules/makers';
import { listPosts } from 'redux/modules/posts';

const [
  ORDER_PRODUCT,
  ORDER_PRODUCT_SUCCESS,
  ORDER_PRODUCT_FAILURE,
] = createRequestActionTypes('order/ORDER_PRODUCT');

const [
  SET_BUYER_MAKERS,
  SET_BUYER_MAKERS_SUCCESS,
  SET_BUYER_MAKERS_FAILURE,
] = createRequestActionTypes('order/SET_BUYER_MAKERS');

const UNLOAD_BUYER_MAKERS = 'order/UNLOAD_BUYER_MAKERS';
const GET_REFUND = 'order/GET_REFUND';

const orderProductSaga = () => {
  return function* (action) {
    yield put(startLoading(ORDER_PRODUCT));

    const { makersId, price } = action.payload;

    try {
      const { address } = yield call(getWallet);

      // 주문하기
      const receipt = yield call(
        contractAPI.methods.orderMakers(parseInt(makersId)).send,
        {
          from: address,
          gas: '5000000',
          value: caver.utils.toPeb(price.toString(), 'KLAY'),
        },
        (error, transactionHash) => {
          if (error) {
            console.log(error);
          }
          console.log('transactionHash:', transactionHash);
        },
      );

      const event = receipt.events.MakersOrdered.returnValues;
      yield put(setMakers(event.makersList.postId));

      console.log('receipt:', receipt);

      ui.showToast({
        status: receipt.status ? 'success' : 'fail',
        message: `주문에 성공하였습니다 (block #${receipt.blockNumber})`,
        link: receipt.transactionHash,
        txHash: receipt.transactionHash,
      });

      const gasPriceToKlay = yield call(caver.utils.fromPeb, receipt.gasPrice);
      const TxFee = gasPriceToKlay * receipt.gasUsed;

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
          typeName: '상품 구매',
          klay: price * -1,
          TxFee: TxFee * -1,
          orderDate: event.orderDate,
        }),
      );

      yield put({
        type: SET_BUYER_MAKERS,
      });

      const { username } = JSON.parse(localStorage.getItem('user'));
      yield put(setTxList({ username }));

      yield put({
        type: ORDER_PRODUCT_SUCCESS,
        payload: receipt,
      });
    } catch (e) {
      yield put({
        type: ORDER_PRODUCT_FAILURE,
        payload: e.toString(),
        error: true,
      });
      yield put(finishLoading(ORDER_PRODUCT));
      ui.showToast({
        status: 'fail',
        message: `주문에 실패하였습니다`,
        error: e.toString(),
      });
      console.log(e.toString());
    }
    yield put(finishLoading(ORDER_PRODUCT));
  };
};

const setBuyerMakersSaga = () => {
  return function* () {
    yield put(startLoading(SET_BUYER_MAKERS));

    try {
      const { address } = yield select(state => state.wallet);
      const BuyerMakers = yield call(
        contractAPI.methods.getBuyerMakers(address).call,
      );

      const parsedMakersBuyers = feedParser(BuyerMakers);
      yield put({
        type: SET_BUYER_MAKERS_SUCCESS,
        payload: parsedMakersBuyers.reverse(),
      });

      const { username } = JSON.parse(localStorage.getItem('user'));
      yield put(listPosts({ username }));
    } catch (e) {
      console.log(e);
      yield put({ type: SET_BUYER_MAKERS_FAILURE, payload: e, error: true });
    }
    yield put(finishLoading(SET_BUYER_MAKERS));
  };
};

const getRefundSaga = () => {
  return function* (action) {
    yield put(startLoading(ORDER_PRODUCT));
    const { price } = action.payload;
    const { address } = yield call(getWallet);
    console.log(address, price);
    try {
      const receipt = yield call(
        contractAPI.methods.failFunding().send,
        {
          from: process.env.REACT_APP_WALLET_ADDRESS,
          gas: '50000000',
          value: caver.utils.toPeb(price.toString(), 'KLAY'),
        },
        (error, transactionHash) => {
          console.log(transactionHash);
          console.log(error);
        },
      );
      console.log(receipt);
    } catch (e) {
      console.log(e);
    }

    yield put(finishLoading(SET_BUYER_MAKERS));
  };
};

export const setBuyerMakers = createAction(SET_BUYER_MAKERS);
export const unloadBuyerMakers = createAction(UNLOAD_BUYER_MAKERS);
export const orderProduct = createAction(
  ORDER_PRODUCT,
  ({ makersId, price }) => ({ makersId, price }),
);
export const getRefund = createAction(GET_REFUND, ({ makersId, price }) => ({
  makersId,
  price,
}));

export function* orderSaga() {
  yield takeLatest(ORDER_PRODUCT, orderProductSaga());
  yield takeLatest(SET_BUYER_MAKERS, setBuyerMakersSaga());
  yield takeLatest(GET_REFUND, getRefundSaga());
}

const initialState = {
  error: null,
  receipt: null,
  feed: null,
  buyerMakers: null,
};

const order = handleActions(
  {
    [ORDER_PRODUCT_SUCCESS]: (state, { payload: receipt }) => ({
      ...state,
      receipt,
    }),
    [ORDER_PRODUCT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [SET_BUYER_MAKERS_SUCCESS]: (state, { payload: parsedMakersBuyers }) => ({
      ...state,
      buyerMakers: parsedMakersBuyers,
    }),
    [SET_BUYER_MAKERS_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [UNLOAD_BUYER_MAKERS]: () => initialState,
  },
  initialState,
);

export default order;
