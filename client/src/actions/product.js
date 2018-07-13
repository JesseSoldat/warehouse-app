import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
import { getProducers } from "./producer";
import { getCustomers } from "./customer";
// types
export const PRODUCTS_FETCH_ALL = "PRODUCTS_FETCH_ALL";
export const PRODUCTS_FETCH_ONE = "PRODUCTS_FETCH_ONE";

// All Products -------------------------------
export const getProducts = ({ products, count, limit, skip }) => ({
  type: PRODUCTS_FETCH_ALL,
  products,
  count,
  limit,
  skip
});

export const startGetProducts = (skip = 0, limit = 20) => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.get(`/api/products?skip=${skip}&limit=${limit}`);

    const { msg, payload, options } = res.data;

    dispatch(getProducts(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "products");
  }
};
// Product Details -------------------------------
export const getProductDetails = product => ({
  type: PRODUCTS_FETCH_ONE,
  product
});

export const startGetProductDetails = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`);

    const { msg, payload, options } = res.data;

    dispatch(getProductDetails(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "product");
  }
};
// Product ( Customers and Producers) --------------------------
export const startGetClients = () => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.get("/api/products/clients");

    const { msg, payload, options } = res.data;
    const { customers, producers } = payload;

    dispatch(getCustomers(customers));
    dispatch(getProducers(producers));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "form data");
  }
};

// Create Product -----------------------------------------------
export const createProduct = (newProduct, history) => async dispatch => {
  try {
    const res = await axios.post("/api/products", newProduct);

    const { msg, payload, options } = res.data;

    checkForMsg(msg, dispatch, options);

    const productId = payload._id;

    history.push(`/products/${productId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "save", "product");
  }
};
