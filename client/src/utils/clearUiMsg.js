const clearUiMsg = (msg, options, serverMsg) => {
  if (msg === null) return;

  const colors = ["success", "info"];
  if (msg && colors.includes(msg.color)) {
    // options
    // console.log("options:", options);

    // code
    if (msg.code) {
      // console.log("msg code:", msg.code);
      setTimeout(() => {
        serverMsg(null);
      }, 3000);
    }
    return;
  }
  serverMsg(null);
};

export default clearUiMsg;
