import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

// css
import "./index.css";

// router
import AppRouter from "./router/AppRouter";
// store
import configureStore from "./store/configureStore";

// actions & action helpers
import buildClientMsg from "./actions/helpers/buildClientMsg";
import { AUTH_LOGIN } from "./actions/auth";
import { NEW_MSG } from "./actions/ui";
// utils
import setAxiosHeader from "./utils/setAxiosHeader";
import isTokenExp from "./utils/isTokenExp";
import deleteExpToken from "./utils/deleteExpToken";

const Loading = () => "loading..";
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRenderedOnce = false;

const renderApp = () => {
  if (!hasRenderedOnce) {
    hasRenderedOnce = true;
    ReactDOM.render(jsx, document.getElementById("root"));
  }
};

ReactDOM.render(<Loading />, document.getElementById("root"));
registerServiceWorker();

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  const { _id, token } = user;

  if (isTokenExp(token)) {
    localStorage.removeItem("user");
    setAxiosHeader(null);
    store.dispatch({
      type: NEW_MSG,
      msg: buildClientMsg({
        info: "Your session expired please login again.",
        color: "blue"
      }),
      loading: false
    });

    deleteExpToken(token);

    renderApp();
  } else {
    store.dispatch({
      type: AUTH_LOGIN,
      _id,
      token
    });
    setAxiosHeader(token);
    renderApp();
  }
} else {
  setAxiosHeader(null);
  renderApp();
}
