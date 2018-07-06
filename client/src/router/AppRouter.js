import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import PublicRoute from "./PublicRoute";
export const history = createHistory();
const h = () => "hello world";

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={h} />
    </Switch>
  </Router>
);

export default AppRouter;
