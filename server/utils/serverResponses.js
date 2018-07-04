const succRes = (res, data) => res.status(200).send(data);

// 400 bad request
// 404 not found
// 500 internal server errro
const errRes = (
  msg = "There was an unknown error on the server",
  statusCode = 400
) => ({ msg, statusCode });

module.exports = { succRes, errRes };
