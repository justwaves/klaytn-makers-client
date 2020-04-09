import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "redux/modules/auth";
import user, { userSaga } from "redux/modules/user";
import loading from "redux/modules/loading";

const env = process.env.NODE_ENV;

const rootReducer = combineReducers({
  auth,
  user,
  loading,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
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
