import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import adminReducer from "../reducers/admin";
import uiReducer from "../reducers/ui";
import authReducer from "../reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      admin: adminReducer,
      ui: uiReducer,
      auth: authReducer
    }),
    {},
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
