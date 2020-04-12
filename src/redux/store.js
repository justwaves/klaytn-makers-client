import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import loading from "redux/modules/loading";
import auth, { authSaga } from "redux/modules/auth";
import user, { userSaga } from "redux/modules/user";
import write, { writeSaga } from "redux/modules/write";
import post, { postSaga } from "redux/modules/post";
import posts, { postsSaga } from "redux/modules/posts";

const env = process.env.NODE_ENV;

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  write,
  post,
  posts,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (env === "development") {
  const { createLogger } = require("redux-logger");
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
