const generateMsgObj = (heading, details, color, cb = null) => ({
  heading,
  details,
  color,
  cb
});

const buildServerMsg = ({ msg, statusCode }) => {
  switch (statusCode) {
    case 200:
      return generateMsgObj("Success Info", msg, "success");

    case 400:
      return generateMsgObj("Server Error", msg, "danger");

    default:
      return generateMsgObj("Unknown Error", msg, "danger");
  }
};

export default buildServerMsg;
