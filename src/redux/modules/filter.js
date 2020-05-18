import { createAction, handleActions } from 'redux-actions';
import { startLoading, finishLoading } from './loading';
import { createRequestActionTypes } from 'lib/createRequestSaga';
import { takeLatest, put } from 'redux-saga/effects';
import { sortPopular, sortDeadline } from 'lib/sort';

const [
  COMBINE_LIST,
  COMBINE_LIST_SUCCESS,
  COMBINE_LIST_FAILURE,
] = createRequestActionTypes('filter/COMBINE_LIST');

const [
  COMBINE_PRODUCT,
  COMBINE_PRODUCT_SUCCESS,
  COMBINE_PRODUCT_FAILURE,
] = createRequestActionTypes('filter/COMBINE_PRODUCT');

const SORT_POPULAR = 'filter/SORT_POPULAR';
const SORT_DEADLINE = 'filter/SORT_DEADLINE';
const FILTER_FINISHED = 'filter/FILTER_FINISHED';
const FILTER_LIST = 'filter/FILTER_LIST';

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

export const fliterList = createAction(FILTER_LIST, ({ list }) => ({
  list,
}));

export const setDeadline = createAction(SORT_DEADLINE, ({ deadlineList }) => ({
  deadlineList,
}));

const filterListSaga = () => {
  return function* (action) {
    const list = action.payload;

    const finishedList = list.filter(product => product.state !== '0');
    yield put({
      type: FILTER_FINISHED,
      payload: finishedList,
    });

    const inProgressList = list.filter(product => product.state === '0');
    const popularList = sortPopular(inProgressList);

    yield put({
      type: SORT_POPULAR,
      payload: popularList,
    });

    // SORT_DEADLINE
    const deadlineList = sortDeadline(inProgressList);
    yield put({
      type: SORT_DEADLINE,
      payload: deadlineList,
    });
  };
};

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
              ...post,
              ...makers,
              dDay: post.dDay,
              makersDDay: makers.dDay,
            };

            newArray.push(newPost);
          }
          return null;
        });
        return null;
      });

      const inProgressList = newArray.filter(product => product.state === '0');

      yield put({
        type: COMBINE_LIST_SUCCESS,
        payload: inProgressList,
      });
      yield put({
        type: FILTER_LIST,
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
      ...post,
      ...makers[0],
      dDay: post.dDay,
      makersDDay: makers.dDay,
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
  yield takeLatest(FILTER_LIST, filterListSaga());
}

const initialState = {
  combinedList: [],
  deadlineList: [],
  popularList: [],
  finishedList: [],
  combinedProduct: null,
  error: null,
  listByState: [],
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
    [SORT_POPULAR]: (state, { payload: popularList }) => ({
      ...state,
      popularList,
    }),
    [SORT_DEADLINE]: (state, { payload: deadlineList }) => ({
      ...state,
      deadlineList,
    }),
    [FILTER_FINISHED]: (state, { payload: finishedList }) => ({
      ...state,
      finishedList,
    }),
  },
  initialState,
);

export default filter;
