import { loading, serverMsg } from "../ui";
import buildClientMsg from "./buildClientMsg";

// dispatches either a msg action or a loading action
const checkForMsg = (msg, dispatch) => {
  if (msg) {
    return dispatch(serverMsg(buildClientMsg(msg)));
  }
  dispatch(loading(false));
};

export default checkForMsg;
