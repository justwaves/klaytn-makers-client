import { createAction, handleActions } from "redux-actions";
import contractAPI from "klaytn/contractAPI";
import { getWallet } from "utils/crypto";
import { startLoading, finishLoading } from "./loading";
import { createRequestActionTypes } from "lib/createRequestSaga";
import { takeLatest, put, call } from "redux-saga/effects";
import caver from "klaytn/caver";
import { feedParser } from "utils/misc";
import { writeTx } from "./tx";
// import ui from "utils/ui";

const [
  ORDER_PRODUCT,
  ORDER_PRODUCT_SUCCESS,
  ORDER_PRODUCT_FAILURE,
] = createRequestActionTypes("order/ORDER_PRODUCT");

const [
  SET_BUYER_MAKERS,
  SET_BUYER_MAKERS_SUCCESS,
  SET_BUYER_MAKERS_FAILURE,
] = createRequestActionTypes("order/SET_BUYER_MAKERS");

const orderProductSaga = () => {
  return function* (action) {
    yield put(startLoading(ORDER_PRODUCT));

    const { makersId, price } = action.payload;

    try {
      // 주소 불러오기
      const { address } = yield call(getWallet);

      console.log(`
        makersId: ${makersId}
        price: ${price}
        address: ${address} 
      `);

      // 주문하기
      const receipt = yield call(
        contractAPI.methods.orderMakers(parseInt(makersId)).send,
        {
          from: address,
          gas: "2000000",
          value: caver.utils.toPeb(price.toString(), "KLAY"),
        },
      );

      const event = receipt.events.MakersOrdered.returnValues;

      console.log("event: ", event);

      console.log(
        `
          Received receipt!
          receipt:
        `,
        receipt,
      );

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
          typeName: "상품 구매",
          klay: price * -1,
          TxFee: TxFee * -1,
        }),
      );

      yield put({
        type: ORDER_PRODUCT_SUCCESS,
        payload: receipt,
      });

      // TODO: dispatch(setTransaction(receipt))
    } catch (e) {
      console.log(e);
      yield put({
        type: ORDER_PRODUCT_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(ORDER_PRODUCT));
  };
};

const setBuyerMakersSaga = () => {
  return function* () {
    yield put(startLoading(SET_BUYER_MAKERS));

    try {
      const { address } = yield call(getWallet);
      const BuyerMakers = yield call(
        contractAPI.methods.getBuyerMakers(address).call,
      );

      const parsedMakersBuyers = feedParser(BuyerMakers);

      yield put({
        type: SET_BUYER_MAKERS_SUCCESS,
        payload: parsedMakersBuyers,
      });
    } catch (e) {
      console.log(e);
      yield put({ type: SET_BUYER_MAKERS_FAILURE, payload: e, error: true });
    }
    yield put(finishLoading(SET_BUYER_MAKERS));
  };
};

export const setBuyerMakers = createAction(SET_BUYER_MAKERS);
export const orderProduct = createAction(
  ORDER_PRODUCT,
  ({ makersId, price }) => ({ makersId, price }),
);

export function* orderSaga() {
  yield takeLatest(ORDER_PRODUCT, orderProductSaga());
  yield takeLatest(SET_BUYER_MAKERS, setBuyerMakersSaga());
}

const initialState = {
  error: null,
  receipt: null,
  feed: null,
  buyerMakers: null,
  // makersStatus: null,
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
  },
  initialState,
);

export default order;
