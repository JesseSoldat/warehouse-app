import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
// types
export const CUSTOMERS_FETCH_ALL = "CUSTOMERS_FETCH_ALL";
export const CUSTOMERS_FETCH_ONE = "CUSTOMERS_FETCH_ONE";

// Get all customers
export const getCustomers = customers => ({
  type: CUSTOMERS_FETCH_ALL,
  customers
});

export const startGetCustomers = () => async dispatch => {
  dispatch(loading(true));

  try {
    const res = await axios.get("/api/customers");

    const { msg, payload, options } = res.data;

    dispatch(getCustomers(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "customers");
  }
};
// Get one customer
export const getCustomer = customer => ({
  type: CUSTOMERS_FETCH_ONE,
  customer
});

export const startGetCustomer = customerId => async dispatch => {
  dispatch(loading(true));

  try {
    const res = await axios.get(`/api/customers/${customerId}`);

    const { msg, payload, options } = res.data;

    dispatch(getCustomer(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "customer");
  }
};
