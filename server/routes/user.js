const crypto = require("crypto");

const User = require("../models/user");
const { succRes, errRes } = require("../utils/serverResponses");
const sendMail = require("../utils/sendMail");
const isEmail = require("../utils/isEmail");
const isAuth = require("../middleware/isAuth");

module.exports = app => {
  // get all of the users of the app
  app.get("/api/users", async (req, res, next) => {
    try {
      const users = await User.find({});
      succRes(res, users);
    } catch (err) {
      next(errRes("An error occured while trying to fetch the users"));
    }
  });

  // register a user
  app.post("/api/register", async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw errRes("All form fields must be filled in.");
      }

      if (!isEmail(email)) {
        throw errRes(
          "The email address you have entered is not a valid email."
        );
      }

      if (password.length < 6) {
        throw errRes("The password must be at least 6 characters longs.");
      }

      const haveUser = await User.findOne({ email });
      if (haveUser) {
        throw errRes(
          "The email address you have entered is already associated with another account."
        );
      }
      const user = new User({ email, password });

      // Email verification token
      const verificationToken = crypto.randomBytes(16).toString("hex");
      user["verificationToken"].token = verificationToken;

      await user.save();
      sendMail(req, user, verificationToken, (type = "confirm"));

      succRes(res, {
        msg: `A verification email has been sent to ${user.email}`
      });
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes("An error occured while trying to register"));
    }
  });

  app.get("/api/confirmation/:token", async (req, res, next) => {
    const { token } = req.params;
    try {
      if (!token) throw new Error();
      const user = await User.findOne({ "verificationToken.token": token });

      if (!user) throw new Error();

      user.isVerified = true;
      user["verificationToken"] = null;
      await user.save();

      succRes(res, "The accound has been verified. Please log in.");
    } catch (err) {
      next(
        errRes(
          "Unable to find a valid token or user. Your token may have expired."
        )
      );
    }
  });

  // login a user
  app.post("/api/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByCredentials(email, password);

      if (!user.isVerified) {
        throw errRes(
          "Please confirm your email first by following the link in the email."
        );
      }
      const token = await user.generateAuthToken();
      res.header("x-auth", token).send(user);
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      errRes("An error occured while trying to login.");
    }
  });

  app.delete("/api/logout", isAuth, async (req, res, next) => {
    const { token, user } = req;

    try {
      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== token);
      await user.save();
      succRes(res, user);
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes("An error occured while logging out"));
    }
  });
};
