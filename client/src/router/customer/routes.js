import React from "react";

import PrivateRoute from "../PrivateRoute";
// components
import Customers from "../../pages/customer/customers/Customers";
import Customer from "../../pages/customer/details/Customer";

const ProducerRoutes = [
  <PrivateRoute
    key="customers"
    path="/customers"
    component={Customers}
    exact
  />,
  <PrivateRoute
    key="customer"
    path="/customers/:customerId"
    component={Customer}
    exact
  />
];

export default ProducerRoutes;
