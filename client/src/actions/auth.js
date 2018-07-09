import axios from "axios";

// utils
import setAxiosHeader from "../utils/setAxiosHeader";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
import buildServerMsg from "./buildServerMsg";
// actions
import { serverMsg } from "./ui";
// types
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const startRegister = (user, history) => async dispatch => {
  try {
    const res = await axios.post("/api/register", user);
    const { msg } = res.data;

    checkForMsg(msg, dispatch);
    history.push("/login");
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "register", "user");
  }
};

export const login = (_id, token) => ({
  type: AUTH_LOGIN,
  _id,
  token
});

export const startLogin = user => async dispatch => {
  try {
    const res = await axios.post("/api/login", user);

    const { msg, payload } = res.data;

    if (payload) {
      const { _id, tokens } = payload;
      const token = tokens[0].token;

      // axios headers
      setAxiosHeader(token);
      // set user to local storage
      localStorage.setItem("user", JSON.stringify({ _id, token }));

      dispatch(login(_id, token));
    }
    checkForMsg(msg, dispatch);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "login", "user");
  }
};

export const startResendVerification = email => async dispatch => {
  try {
    const res = await axios.post("/api/resendVerification", { email });
    const { msg } = res.data;

    if (msg.statusCode === 201) {
      return dispatch(serverMsg(buildServerMsg(msg)));
    }

    if (msg.statusCode === 400) {
      dispatch(serverMsg(buildServerMsg(msg)));
    } else {
      dispatch(serverMsg(buildServerMsg(msg)));
    }
  } catch (err) {
    dispatch(
      serverMsg(
        buildServerMsg({
          msg: "Something went wrong while resending the verification.",
          statusCode: 500
        })
      )
    );
  }
};

export const startLogout = () => async dispatch => {
  try {
    const res = await axios.delete("/api/logout");
    const { msg } = res.data;
    // axios headers
    setAxiosHeader(null);
    // remove user to local storage
    localStorage.removeItem("user");
    dispatch({ type: AUTH_LOGOUT, _id: null, token: null });
    checkForMsg(msg, dispatch);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "logout", "user");
  }
};
