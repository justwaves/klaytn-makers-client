import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "redux/modules/auth";

const rootReducer = combineReducers({
  auth,
});

const env = process.env.NODE_ENV;

const middlewares = [];

if (env === "development") {
  const { createLogger } = require("redux-logger");
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
