import React from "react";

import PrivateRoute from "../PrivateRoute";
// components
import Producers from "../../pages/producer/producers/Producers";
import Producer from "../../pages/producer/details/Producer";
import CreateProducer from "../../pages/producer/form/CreateProducer";

const ProducerRoutes = [
  <PrivateRoute
    key="producers"
    path="/producers"
    component={Producers}
    exact
  />,
  <PrivateRoute
    key="producer-create"
    path="/producers/create"
    component={CreateProducer}
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
