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
      succRes(res, null, users);
    } catch (err) {
      next(errRes("An error occured while trying to fetch the users."));
    }
  });

  // register a user and send verification email
  app.post("/api/register", async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(202)
        .send(errRes("All form fields must be filled in.", 202));
    }

    if (!isEmail(email)) {
      return res
        .status(202)
        .send(
          errRes(
            "The email address you have entered is not a valid email.",
            202
          )
        );
    }

    if (password.length < 6) {
      return res
        .status(202)
        .send(errRes("The password must be at least 6 characters longs.", 202));
    }

    try {
      const haveUser = await User.findOne({ email });

      if (haveUser) {
        return res.send(
          errRes(
            "The email address you have entered is already associated with another account.",
            400
          )
        );
      }

      const user = new User({ username, email, password });

      // Email verification token
      const verificationToken = crypto.randomBytes(16).toString("hex");
      user["verificationToken"].token = verificationToken;

      await user.save();
      sendMail(req, user, verificationToken, (type = "confirm"));

      succRes(
        res,
        {
          msg: `A verification email has been sent to ${
            user.email
          }. Please verify your email before you login.`,
          statusCode: 200
        },
        null
      );
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes("An error occured while trying to register.", 500));
    }
  });

  // verify user with sent email
  app.get("/api/confirmation/:token", async (req, res, next) => {
    const { token } = req.params;
    try {
      if (!token) throw new Error();

      const user = await User.findOne({ "verificationToken.token": token });

      if (!user) throw new Error();

      user.isVerified = true;
      user["verificationToken"] = null;
      await user.save();
      return res.redirect("/login?verify=true");
    } catch (err) {
      return res.redirect("/login?verifyErr=true");
    }
  });

  // resend verification email
  app.post("/api/resendVerification", async (req, res, next) => {
    const { email } = req.body;

    if (!isEmail(email)) {
      return res.send(
        errRes("The email address you have entered is not a valid email.", 202)
      );
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.send(errRes("Unable to find a user with that email.", 400));
      }

      // Info
      if (user.isVerified) {
        return res.send(
          errRes("This account has already been verified. Please log in.", 201)
        );
      }

      // Create a verification token, save it, and send email
      const verficationToken = crypto.randomBytes(16).toString("hex");
      user["verificationToken"].token = verficationToken;
      await user.save();

      sendMail(req, user, verficationToken, (type = "confirm"));

      succRes(
        res,
        {
          msg: `A verification email has been sent to ${user.email}`
        },
        null
      );
    } catch (err) {
      next(errRes("An error occured while trying to verify the email."));
    }
  });

  // login a user and create an auth token
  app.post("/api/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(202)
        .send(errRes("All form fields must be filled in.", 202));
    }

    if (!isEmail(email)) {
      return res
        .status(202)
        .send(
          errRes(
            "The email address you have entered is not a valid email.",
            202
          )
        );
    }

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res
          .status(202)
          .send(errRes("No user for this email and password.", 400));
      }

      if (!user.isVerified) {
        return res.send(
          errRes(
            "Please confirm your email first by following the link in the email.",
            201
          )
        );
      }

      const token = await user.generateAuthToken();

      const msg = {
        msg: "Login was successful.",
        statusCode: 200
      };
      res.header("x-auth", token).send({ payload: user, msg });
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes("An unknown error occured while trying to login.", 500));
    }
  });

  // logout and remove the auth token
  app.delete("/api/logout", isAuth, async (req, res, next) => {
    // isAuth middleware provides token and user
    const { token, user } = req;

    try {
      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== token);
      await user.save();
      succRes(res, null, null);
    } catch (err) {
      console.log(err);

      if (err.msg) {
        return next(err);
      }
      next(errRes("An error occured while logging out"));
    }
  });
};
