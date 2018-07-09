const succRes = (res, msg = null, payload = null) =>
  res.status(200).send({ msg, payload });

const errRes = (
  err = "There was an unknown error on the server",
  statusCode = 400,
  payload = null
) => ({ msg: { msg: err, statusCode }, payload });

const errMsg = (method, target) => {
  return `An error occured while trying to ${method} the ${target}.`;
};

const msgObj = (info, color) => ({
  info,
  color
});

const serverRes = (res, status, msg = null, payload = null) => {
  res.status(status).send({ msg, payload });
};

// res , status / msg / payload
// serverRes(res, 201, { info: "it worked", color: "info" }, null);

module.exports = { serverRes, succRes, errRes, errMsg, msgObj };
