const User = require("../models/user");
const { errRes } = require("../utils/serverResponses");

const isAuth = async (req, res, next) => {
  const token = req.header("x-auth");

  try {
    if (!token) throw errRes("A token is required for this route");

    const user = await User.findByToken(token);
    console.log("isAuth middleware");
    console.log("email", user && user.email);

    if (!user) throw errRes("A user with that token was not found");

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    if (err.msg) {
      return next(err);
    }
    next(errRes("You must be authenticated to visit this route"));
  }
};

module.exports = isAuth;
