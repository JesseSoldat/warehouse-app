import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import AdminRoutes from "./admin/routes";
import AuthRoutes from "./auth/routes";
import GeneralRoutes from "./general/routes";
import ProductRoutes from "./product/routes";
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      {AdminRoutes}
      {AuthRoutes}
      {GeneralRoutes}
      {ProductRoutes}
    </Switch>
  </Router>
);

export default AppRouter;
