import { createAction, handleActions } from 'redux-actions';
import { startLoading, finishLoading } from './loading';
import { createRequestActionTypes } from 'lib/createRequestSaga';
import { takeLatest, put } from 'redux-saga/effects';
import moment from 'moment';

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

const [
  FILTER_STATE,
  FILTER_STATE_SUCCESS,
  FILTER_STATE_FAILURE,
] = createRequestActionTypes('filter/FILTER_STATE');

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

export const filterState = createAction(FILTER_STATE, ({ list }) => ({
  list,
}));

export const fliterList = createAction(FILTER_LIST, ({ list }) => ({
  list,
}));

export const setDeadline = createAction(SORT_DEADLINE, ({ deadlineList }) => ({
  deadlineList,
}));

const filterStateSaga = () => {
  return function* (action) {
    const list = action.payload;

    const arr = [];
    const now = Math.ceil(new Date().getTime() / 1000);
    console.log(list, now);
    list.map(product => {
      if (product.makersDDay < now) {
        arr.push(product);
        console.log(arr);
      }
    });

    console.log(`
    ----
    ${{ arr }}
    ----
    `);

    yield put({
      type: FILTER_STATE_SUCCESS,
      payload: arr,
    });
  };
};

const filterListSaga = () => {
  return function* (action) {
    const list = action.payload;

    // SORT_POPULAR
    list.sort((a, b) => {
      const aCount = a.count;
      const aTargetCount = a.targetCount;
      const bCount = b.count;
      const bTargetCount = b.targetCount;
      const aPercentage = aCount / aTargetCount;
      const bPercentage = bCount / bTargetCount;

      if (aPercentage > bPercentage) {
        return -1;
      }
      if (aPercentage < bPercentage) {
        return 1;
      }
      return 0;
    });
    yield put({
      type: SORT_POPULAR,
      payload: list,
    });

    // SORT_DEADLINE
    list.sort((a, b) => {
      if (a.dDay > b.dDay) {
        return 1;
      }
      if (a.dDay < b.dDay) {
        return -1;
      }
      return 0;
    });
    yield put({
      type: SORT_DEADLINE,
      payload: list,
    });

    const finishedList = list.filter(product => product.state !== '0');
    yield put({
      type: FILTER_FINISHED,
      payload: finishedList,
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
            console.log(makers.dDay);
            const date = moment(makers.dDay).format('YYYY년 MM월 DD일');
            console.log('================', date);

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
      yield put({
        type: FILTER_LIST,
        payload: newArray,
      });
      yield put({
        type: FILTER_STATE,
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
  yield takeLatest(FILTER_STATE, filterStateSaga());
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
    [FILTER_STATE_SUCCESS]: (state, { payload: list }) => ({
      ...state,
      listByState: list,
    }),
    [FILTER_STATE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      error: e,
    }),
    [SORT_POPULAR]: (state, { payload: list }) => ({
      ...state,
      popularList: list,
    }),
    [SORT_DEADLINE]: (state, { payload: list }) => ({
      ...state,
      deadlineList: list,
    }),
    [FILTER_FINISHED]: (state, { payload: finishedList }) => ({
      ...state,
      finishedList,
    }),
  },
  initialState,
);

export default filter;
