import { serverMsg } from "../ui";
import buildClientMsg from "./buildClientMsg";

const axiosLog = (status, data) => {
  console.log("--------------- axios error handling -----------------");
  // console.log("axios status", status);
  // console.log("axios data", data);
  console.log("msg", data.msg.info);
  // console.log("color", data.msg.color);
  console.log("------------------------------------------------------");
};

const errMsg = (method, target) =>
  `An unknown error occured while trying to ${method} the ${target}.`;

const axiosResponseErrorHandling = (error, dispatch, method, target) => {
  let info, color;

  // check for axios response object any response other than 2xx
  if (error && error.response) {
    const { status, data } = error.response;

    axiosLog(status, data);
    color = data.msg.color;
    info = data.msg.info;
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
