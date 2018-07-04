const User = require("../models/user");
const { succRes, errRes } = require("../utils/serverResponses");

module.exports = app => {
  // get all of the users of the app
  app.get("/api/users", async (req, res, next) => {
    try {
      const users = await User.find({});
      succRes(res, users);
    } catch (err) {
      next(errRes("Bad request error"));
    }
  });

  // register a user
  app.post("/api/register", async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const haveUser = await User.findOne({ email });
      if (haveUser) {
        throw errRes(
          "The email address you have entered is already associated with another account."
        );
      }
      const user = new User({ email, password });
      await user.save();
      succRes(res, user);
    } catch (err) {
      next(errRes("An error occured while trying to register"));
    }
  });
};
