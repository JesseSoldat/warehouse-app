import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
// types
export const PRODUCERS_FETCH_ALL = "PRODUCERS_FETCH_ALL";
export const PRODUCERS_FETCH_ONE = "PRODUCERS_FETCH_ONE";

export const getProducers = producers => ({
  type: PRODUCERS_FETCH_ALL,
  producers
});

export const startGetProducers = () => async dispatch => {
  dispatch(loading(true));

  try {
    const res = await axios.get("/api/producers");

    const { msg, payload, options } = res.data;

    dispatch(getProducers(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "producers");
  }
};
