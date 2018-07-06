import axios from "axios";

import setAxiosHeader from "../utils/setAxiosHeader";
import buildServerMsg from "./buildServerMsg";
import { serverMsg, LOADING } from "./ui";
export const AUTH_LOGIN = "AUTH_LOGIN";

export const startRegister = (user, history) => async dispatch => {
  dispatch({ type: LOADING, loading: true });
  try {
    const res = await axios.post("/api/register", user);

    if (res.data && res.data.msg) {
      dispatch(serverMsg(buildServerMsg(res.data)));
      if (res.data.statusCode === 200) {
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
