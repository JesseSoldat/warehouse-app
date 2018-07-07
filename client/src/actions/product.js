import axios from "axios";

import { loading, serverMsg } from "./ui";
import buildServerMsg from "./buildServerMsg";

export const PRODUCTS_FETCH_ALL = "PRODUCTS_FETCH_ALL";

export const startGetProducts = (skip = 0, limit = 20) => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.get(`/api/products?skip=${skip}&limit=${limit}`);
    console.log(res);
    dispatch(loading(false));
  } catch (error) {
    dispatch(
      serverMsg(
        buildServerMsg({
          msg: "Something went wrong while getting the products",
          statusCode: 500
        })
      )
    );
  }
};
