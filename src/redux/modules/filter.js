import { createAction, handleActions } from "redux-actions";
import { startLoading, finishLoading } from "./loading";
import { createRequestActionTypes } from "lib/createRequestSaga";
import { takeLatest, put } from "redux-saga/effects";

const [
  COMBINE_LIST,
  COMBINE_LIST_SUCCESS,
  COMBINE_LIST_FAILURE,
] = createRequestActionTypes("filter/COMBINE_LIST");

const [
  COMBINE_PRODUCT,
  COMBINE_PRODUCT_SUCCESS,
  COMBINE_PRODUCT_FAILURE,
] = createRequestActionTypes("filter/COMBINE_PRODUCT");

export const combineList = createAction(COMBINE_LIST, ({ posts, feed }) => ({
  posts,
  feed,
}));

export const combineProduct = createAction(
  COMBINE_PRODUCT,
  ({ post, makers }) => ({
    post,
    makers,
  }),
);

const combineListSaga = () => {
  return function* (action) {
    yield put(startLoading(COMBINE_LIST));
    const { posts, feed } = action.payload;

    const newArray = [];
    try {
      feed.map(makers => {
        posts.map(post => {
          if (post._id === makers.postId) {
            const newPost = {
              _id: post._id,
              tags: post.tags,
              title: post.title,
              body: post.body,
              user: post.user,
              makersId: makers.makersId,
              description: post.description,
              photo: post.photo,
              price: post.price,
              targetCount: post.targetCount,
              dDay: post.dDay,
              publishedDate: post.publishedDate,
              timestamp: makers.timestamp,
              count: makers.count,
              state: makers.state,
            };

            newArray.push(newPost);
          }
          return null;
        });
        return null;
      });

      yield put({
        type: COMBINE_LIST_SUCCESS,
        payload: newArray,
      });
    } catch (e) {
      yield put({
        type: COMBINE_LIST_FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(COMBINE_LIST));
  };
};

const combineProductSaga = () => {
  return function* (action) {
    yield put(startLoading(COMBINE_PRODUCT));
    const { post, makers } = action.payload;

    const product = {
      _id: post._id,
      tags: post.tags,
      title: post.title,
      body: post.body,
      user: post.user,
      makersId: makers[0].makersId,
      description: post.description,
      photo: post.photo,
      price: post.price,
      targetCount: post.targetCount,
      dDay: post.dDay,
      publishedDate: post.publishedDate,
      timestamp: makers[0].timestamp,
      seller: makers[0].seller,
      count: makers[0].count,
      state: makers[0].state,
    };

    yield put({
      type: COMBINE_PRODUCT_SUCCESS,
      payload: product,
    });

    yield put(finishLoading(COMBINE_PRODUCT));
  };
};

export function* filterSaga() {
  yield takeLatest(COMBINE_LIST, combineListSaga());
  yield takeLatest(COMBINE_PRODUCT, combineProductSaga());
}

const initialState = {
  combinedList: [],
  combinedProduct: null,
  error: null,
};

const filter = handleActions(
  {
    [COMBINE_LIST_SUCCESS]: (state, { payload: newArray }) => ({
      ...state,
      combinedList: newArray,
    }),
    [COMBINE_LIST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [COMBINE_PRODUCT_SUCCESS]: (state, { payload: product }) => ({
      ...state,
      combinedProduct: product,
    }),
    [COMBINE_PRODUCT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
  },
  initialState,
);

export default filter;
