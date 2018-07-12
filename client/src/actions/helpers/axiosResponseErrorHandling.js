import { serverMsg } from "../ui";
import { login } from "../auth";
import buildClientMsg from "./buildClientMsg";

const axiosLog = (status, data) => {
  console.log("--------------- axios error handling -----------------");
  // console.log("axios status:", status);
  // console.log("axios data:", data);
  console.log("info:", data.msg.info);
  // console.log("color:", data.msg.color);
};

const errMsg = (method, target) =>
  `An unknown error occured while trying to ${method} the ${target}.`;

const axiosResponseErrorHandling = (error, dispatch, method, target) => {
  let info, color;

  // check for axios response object any response other than 2xx
  if (error && error.response) {
    const { status, data } = error.response;
    // check that the server sent the correct msg obj
    if (!data || !data.msg || !data.msg.info) {
      console.log(
        "axios error handling - the msg obj was not sent from the server"
      );
      info = errMsg(method, target);
      color = "red";
    }
    // check for expired or no token info
    else if (data.msg.info === "token error") {
      console.log("isAuth: token error");
      info = "A user with that token was not found. Please login again";
      color = "blue";
      localStorage.removeItem("user");
      dispatch(login(null, null));
    }
    // default case
    else {
      axiosLog(status, data);
      color = data.msg.color;
      info = data.msg.info;
    }
  }
  // The request was made but no response was received
  else if (error.request) {
    info = "The request was made but no response was received from the server.";
    color = "red";
  } else {
    // No axios object catch any other errors
    info = errMsg(method, target);
    color = "red";
  }

  dispatch(
    serverMsg(
      buildClientMsg({
        info,
        color
      })
    )
  );
};

export default axiosResponseErrorHandling;
