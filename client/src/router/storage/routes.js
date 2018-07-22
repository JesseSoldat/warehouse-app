import React from "react";

import PrivateRoute from "../PrivateRoute";

import Storages from "../../pages/storage/storages/Storages";
import Storage from "../../pages/storage/storage/Storage";

const StorageRoutes = [
  <PrivateRoute
    key="/storages"
    path="/storages"
    component={Storages}
    exact={true}
  />,
  <PrivateRoute
    key="/storages/:id"
    path="/storages/:id"
    component={Storage}
    exact={true}
  />
];

export default StorageRoutes;
