const succRes = (res, msg, payload = null) =>
  res.status(200).send({ msg, payload });

const errRes = (
  err = "There was an unknown error on the server",
  statusCode = 400,
  payload = null
) => ({ msg: { msg: err, statusCode }, payload });

const errMsg = (method, target) => {
  `An error occured while trying to ${method} the ${target}.`;
};

module.exports = { succRes, errRes, errMsg };
