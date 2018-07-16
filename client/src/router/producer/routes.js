import React from "react";

import PrivateRoute from "../PrivateRoute";
// components
import Producers from "../../pages/producer/producers/Producers";

const ProducerRoutes = [
  <PrivateRoute key="producers" path="/producers" component={Producers} exact />
];

export default ProducerRoutes;
