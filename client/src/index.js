import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import AppRouter from "./router/AppRouter";
import configureStore from "./store/configureStore";
import setAxiosHeader from "./utils/setAxiosHeader";
import { AUTH_LOGIN } from "./actions/auth";
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
    console.log("Token is expired");
    localStorage.removeItem("user");
    setAxiosHeader(null);

    deleteExpToken(_id, token);

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
