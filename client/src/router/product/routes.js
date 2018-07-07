import React from "react";

import PrivateRoute from "../PrivateRoute";

import Products from "../../pages/product/products/Products";

const ProductRoutes = [
  <PrivateRoute key="products" path="/products" component={Products} exact />
];

export default ProductRoutes;
