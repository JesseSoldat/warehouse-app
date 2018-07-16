import React from "react";

import PrivateRoute from "../PrivateRoute";
// components
import Producers from "../../pages/producer/producers/Producers";
import Producer from "../../pages/producer/details/Producer";

const ProducerRoutes = [
  <PrivateRoute
    key="producers"
    path="/producers"
    component={Producers}
    exact
  />,
  <PrivateRoute
    key="producer"
    path="/producers/:producerId"
    component={Producer}
    exact
  />
];

export default ProducerRoutes;
