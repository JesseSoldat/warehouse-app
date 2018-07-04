const succRes = (res, data) => res.status(200).send(data);

// 400 bad request
// 404 not found
// 500 internal server errro
const errRes = (msg = "", statusCode = 400) => ({ statusCode, msg });

module.exports = { succRes, errRes };
