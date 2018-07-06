import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import AuthRoutes from "./auth/routes";
import GeneralRoutes from "./general/routes";
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      {AuthRoutes}
      {GeneralRoutes}
    </Switch>
  </Router>
);

export default AppRouter;
