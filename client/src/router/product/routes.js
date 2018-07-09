import React from "react";

import PrivateRoute from "../PrivateRoute";

import Products from "../../pages/product/products/Products";
import CreateProduct from "../../pages/product/form/CreateProduct";
import ProductDetails from "../../pages/product/details/ProductDetails";

const ProductRoutes = [
  <PrivateRoute key="products" path="/products" component={Products} exact />,
  <PrivateRoute
    key="create-product"
    path="/products/create"
    component={CreateProduct}
    exact
  />,
  <PrivateRoute
    key="product"
    path="/products/:productId"
    component={ProductDetails}
    exact
  />
];

export default ProductRoutes;
