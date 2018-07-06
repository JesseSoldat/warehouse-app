import axios from "axios";

import setAxiosHeader from "../utils/setAxiosHeader";

export const AUTH_MSG = "AUTH_MSG";
export const AUTH_LOADING = "AUTH_LOADING";

export const serverMsg = ({ type, details, color, cb = null }) => ({
  type,
  details,
  color,
  cb,
  loading: false
});

export const startRegister = (user, history) => async dispatch => {
  dispatch({ type: AUTH_LOADING });
  try {
    const res = await axios.post("/api/register", user);
    console.log(res.data);
    const msg = {
      type: "Server Info",
      details: "You have succesfully registered",
      color: "info",
      cb: null
    };
    dispatch(serverMsg(msg));
  } catch (err) {
    console.log(err);

    const msg = {
      type: "Server Error",
      details: "An error occured while trying to register",
      color: "danger",
      cb: null
    };
    dispatch(serverMsg(msg));
  }
};
