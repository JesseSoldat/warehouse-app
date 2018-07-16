import React from "react";

import PrivateRoute from "../PrivateRoute";
// components
import Customers from "../../pages/customer/customers/Customers";
import Customer from "../../pages/customer/details/Customer";
import CreateCustomer from "../../pages/customer/form/CreateCustomer";

const ProducerRoutes = [
  <PrivateRoute
    key="customers"
    path="/customers"
    component={Customers}
    exact
  />,
  <PrivateRoute
    key="customers=create"
    path="/customers/create"
    component={CreateCustomer}
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
