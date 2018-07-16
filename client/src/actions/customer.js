import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
// types
export const CUSTOMERS_FETCH_ALL = "CUSTOMERS_FETCH_ALL";

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
