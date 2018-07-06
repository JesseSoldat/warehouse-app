import axios from "axios";

import { serverMsg, LOADING } from "./ui";
import buildServerMsg from "./buildServerMsg";

export const GET_ALL_USERS = "GET_ALL_USERS";

export const getAllUsers = payload => ({
  type: GET_ALL_USERS,
  allUsers: payload
});

export const startGetAllUsers = () => async dispatch => {
  dispatch({ type: LOADING, loading: true });
  try {
    const res = await axios.get("/api/users");
    const { msg, payload } = res.data;

    if (msg) {
      dispatch(serverMsg(buildServerMsg(msg)));
      return;
    }
    dispatch({ type: LOADING, loading: false });
    dispatch(getAllUsers(payload));
  } catch (err) {
    console.log(err);
  }
};
