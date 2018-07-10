const User = require("../models/user");

const { msgObj, serverRes } = require("../utils/serverResponses");

// send a token error msg to the client
// thes client will delete the token from localstorage
// the user will have to login to the app again

const isAuth = async (req, res, next) => {
  const token = req.header("x-auth");

  try {
    if (!token) {
      const msg = msgObj("token error", "blue");
      return serverRes(res, 400, msg, null);
    }

    const user = await User.findByToken(token);

    if (!user) {
      const msg = msgObj("token error", "blue");
      return serverRes(res, 400, msg, null);
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    const msg = msgObj("token error", "blue");
    serverRes(res, 400, msg, null);
  }
};

module.exports = isAuth;
