import React from "react";

import PrivateRoute from "../PrivateRoute";

import Dashboard from "../../pages/general/Dashboard";

const GeneralRoutes = [
  <PrivateRoute key="dashboard" path="/dashboard" component={Dashboard} exact />
];

export default GeneralRoutes;
