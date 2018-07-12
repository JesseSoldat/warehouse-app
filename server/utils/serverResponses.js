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

module.exports = { serverRes, errMsg, msgObj };
