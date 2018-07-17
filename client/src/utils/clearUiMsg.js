const clearUiMsg = (msg, serverMsg) => {
  if (msg === null) return;

  console.log("msg not null");
  const colors = ["success", "info"];
  if (msg && colors.includes(msg.color)) {
    console.log("msg color:", msg.color);
    return;
  }
  console.log("clear msg");
  serverMsg(null);
};

export default clearUiMsg;
