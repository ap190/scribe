import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import Async from "../middlewares/async";
import login from "./login_reducer";

const reducers = combineReducers({
  login
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(Async, thunk, createLogger())
);

// app state is created by reducers
const store = createStore(
  combineReducers({
    reducers
  }),
  undefined,
  enhancer
);

export default store;
