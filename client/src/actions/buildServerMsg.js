const generateMsgObj = (heading, details, color) => ({
  heading,
  details,
  color
});

const buildServerMsg = ({ msg, statusCode }) => {
  switch (statusCode) {
    case 200:
      return generateMsgObj("Success Info", msg, "success");

    case 201:
      return generateMsgObj("Server Info", msg, "info");

    case 202:
      return generateMsgObj("Server Info", msg, "warning");

    case 400:
      return generateMsgObj("Server Error", msg, "danger");

    default:
      return generateMsgObj("Unknown Error", msg, "danger");
  }
};

export default buildServerMsg;
