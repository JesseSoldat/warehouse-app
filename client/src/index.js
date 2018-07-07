import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import configureStore from "./store/configureStore";
import AppRouter from "./router/AppRouter";
// import { AUTH_LOGIN } from "./actions/auth"; // TODO not updating state BUG
import setAxiosHeader from "./utils/setAxiosHeader";

const store = configureStore();
const Loading = () => "loading..";

const jsx = (
  <Provider store={configureStore()}>
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
  // console.log("localStorage", _id);

  // TODO this is not updating the state BUG
  // store.dispatch({
  //   type: AUTH_LOGIN,
  //   _id,
  //   token
  // });

  setAxiosHeader(token);
  renderApp();
} else {
  setAxiosHeader(null);
  renderApp();
}
