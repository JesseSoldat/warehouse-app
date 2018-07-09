import { loading, serverMsg } from "../ui";
import buildClientMsg from "./buildClientMsg";

const checkForMsg = (msg, dispatch) => {
  if (msg) {
    return dispatch(serverMsg(buildClientMsg(msg)));
  }
  dispatch(loading(false));
};

export default checkForMsg;
