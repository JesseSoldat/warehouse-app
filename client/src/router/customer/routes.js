import React from "react";

import PrivateRoute from "../PrivateRoute";
// components
import Customers from "../../pages/customer/customers/Customers";

const ProducerRoutes = [
  <PrivateRoute key="customers" path="/customers" component={Customers} exact />
];

export default ProducerRoutes;
