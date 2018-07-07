import axios from "axios";

import setAxiosHeader from "../utils/setAxiosHeader";
import buildServerMsg from "./buildServerMsg";
import { serverMsg, LOADING } from "./ui";
export const AUTH_LOGIN = "AUTH_LOGIN";

export const startRegister = (user, history) => async dispatch => {
  try {
    const res = await axios.post("/api/register", user);
    const { msg, payload } = res.data;

    if (res.data && res.data.msg) {
      // All Messages (error & success)
      dispatch(serverMsg(buildServerMsg(msg)));
      // Navigate on success
      if (msg.statusCode === 200) {
        history.push("/login");
      }
      return;
    }
  } catch (err) {
    dispatch(
      serverMsg(
        buildServerMsg({
          msg: "Something went wrong while posting the data",
          statusCode: 500
        })
      )
    );
  }
};

export const login = (_id, token) => ({
  type: AUTH_LOGIN,
  _id,
  token
});

export const startLogin = (user, history) => async dispatch => {
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

      dispatch(serverMsg(buildServerMsg(msg)));
      dispatch(login(_id, token));
      return history.push("/dashboard");
    } else {
      return dispatch(serverMsg(buildServerMsg(msg)));
    }
  } catch (err) {
    dispatch(
      serverMsg(
        buildServerMsg({
          msg: "Something went wrong while posting the data",
          statusCode: 500
        })
      )
    );
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
    console.log(err);
  }
};
