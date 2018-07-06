import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import configureStore from "./store/configureStore";
import AppRouter from "./router/AppRouter";

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

const user = false;
if (user) {
  renderApp();
} else {
  renderApp();
}
