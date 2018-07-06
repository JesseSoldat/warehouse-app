import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();
const h = () => "hello world";

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={h} />
    </Switch>
  </Router>
);

export default AppRouter;
