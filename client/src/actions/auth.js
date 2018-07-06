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
      dispatch(serverMsg(buildServerMsg(msg)));
      dispatch(login(_id, token));
      return history.push("/dashboard");
    }

    if (msg.statusCode === 400) {
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
