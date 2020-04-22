import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
// import ReduxThunk from "redux-thunk";
import { all } from "redux-saga/effects";
import loading from "redux/modules/loading";
import auth, { authSaga } from "redux/modules/auth";
import user, { userSaga } from "redux/modules/user";
import write, { writeSaga } from "redux/modules/write";
import post, { postSaga } from "redux/modules/post";
import posts, { postsSaga } from "redux/modules/posts";
import wallet, { walletSaga } from "redux/modules/wallet";
import ui from "redux/modules/ui";

const env = process.env.NODE_ENV;

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  write,
  post,
  posts,
  wallet,
  ui,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    walletSaga(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware /* ReduxThunk*/];

if (env === "development") {
  // const { createLogger } = require("redux-logger");
  // const logger = createLogger();
  // middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
