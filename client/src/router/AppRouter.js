import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import PublicRoute from "./PublicRoute";
import AuthRoutes from "./auth/routes";
import GeneralRoutes from "./general/routes";
export const history = createHistory();
const h = () => "hello world";

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" exact component={h} />
      {AuthRoutes}
      {GeneralRoutes}
    </Switch>
  </Router>
);

export default AppRouter;
