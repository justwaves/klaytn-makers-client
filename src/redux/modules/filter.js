import { createAction, handleActions } from "redux-actions";
import { startLoading, finishLoading } from "./loading";
import { createRequestActionTypes } from "lib/createRequestSaga";
import { takeLatest, put } from "redux-saga/effects";

const [
  COMBINE_LIST,
  COMBINE_LIST_SUCCESS,
  COMBINE_LIST_FAILURE,
] = createRequestActionTypes("filter/COMBINE_LIST");

export const combineList = createAction(COMBINE_LIST, ({ posts, feed }) => ({
  posts,
  feed,
}));

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
              tokenId: post.tokenId,
              description: post.description,
              photo: post.photo,
              price: post.price,
              targetCount: post.targetCount,
              dDay: post.dDay,
              publishedDate: post.publishedDate,
              timestamp: makers.timestamp,
              buyers: makers.buyers,
              count: makers.count,
              status: makers.status,
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

export function* filterSaga() {
  yield takeLatest(COMBINE_LIST, combineListSaga());
}

const initialState = {
  combinedList: [],
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
  },
  initialState,
);

export default filter;
