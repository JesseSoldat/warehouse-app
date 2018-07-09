// create obj to use in the Message Component
const generateMsgObj = (heading, details, color) => ({
  heading,
  details,
  color
});

// gets a msg obj with info and color property
const buildClientMsg = ({ info = null, color = null }) => {
  switch (color) {
    case "green":
      return generateMsgObj("Success Info", info, "success");

    case "blue":
      return generateMsgObj("Server Info", info, "info");

    case "yellow":
      return generateMsgObj("Server Info", info, "warning");

    case "red":
      return generateMsgObj("Server Error", info, "danger");

    default:
      return generateMsgObj("Unknown Error", info, "danger");
  }
};

export default buildClientMsg;
