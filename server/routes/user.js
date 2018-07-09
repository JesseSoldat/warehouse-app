const crypto = require("crypto");

// models
const User = require("../models/user");
// helpers
const { errMsg, serverRes } = require("../utils/serverResponses");
// utils
const sendMail = require("../utils/sendMail");
const isEmail = require("../utils/isEmail");
const isAuth = require("../middleware/isAuth");

module.exports = app => {
  // get all of the users of the app
  app.get("/api/users", isAuth, async (req, res, next) => {
    try {
      const users = await User.find({});
      serverRes(res, 200, null, users);
    } catch (err) {
      const msg = {
        info: errMsg("fetch", "users"),
        color: "red"
      };
      serverRes(res, 400, msg, null);
    }
  });

  // register a user and send verification email
  app.post("/api/register", async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      const msg = {
        info: "All form fields must be filled in.",
        color: "red"
      };
      serverRes(res, 400, msg, null);
      return;
    }

    if (!isEmail(email)) {
      const msg = {
        info: "The email address you have entered is not a valid email.",
        color: "red"
      };
      return serverRes(res, 400, msg, null);
    }

    if (password.length < 6) {
      const msg = {
        info: "The password must be at least 6 characters longs.",
        color: "red"
      };
      return serverRes(res, 400, msg, null);
    }

    try {
      const haveUser = await User.findOne({ email });

      if (haveUser) {
        const msg = {
          info:
            "The email address you have entered is already associated with another account.",
          color: "yellow"
        };
        return serverRes(res, 400, msg, null);
      }

      const user = new User({ username, email, password });

      // Email verification token
      const verificationToken = crypto.randomBytes(16).toString("hex");
      user["verificationToken"].token = verificationToken;

      await user.save();
      sendMail(req, user, verificationToken, (type = "confirm"));

      // Success ---------------
      const msg = {
        info: `A verification email has been sent to ${
          user.email
        }. Please verify your email before you login.`,
        color: "blue"
      };
      return serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = {
        info: "An error occured while trying to register.",
        color: "red"
      };
      return serverRes(res, 400, msg, null);
    }
  });

  // verify user with sent email
  app.get("/api/confirmation/:token", async (req, res, next) => {
    const { token } = req.params;
    // is the token expired if so delete it from user model and redirect user
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
      const msg = {
        info: "The email address you have entered is not a valid email.",
        color: "red"
      };
      return serverRes(res, 400, msg, null);
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        const msg = {
          info: "Unable to find a user with that email.",
          color: "red"
        };
        return serverRes(res, 400, msg, null);
      }

      if (user.isVerified) {
        const msg = {
          info: "This account has already been verified. Please log in.",
          color: "blue"
        };
        return serverRes(res, 400, msg, null);
      }

      // Create a verification token, save it, and send email
      const verficationToken = crypto.randomBytes(16).toString("hex");
      user["verificationToken"].token = verficationToken;
      await user.save();

      sendMail(req, user, verficationToken, (type = "confirm"));

      const msg = {
        info: `A verification email has been sent to ${user.email}.`,
        color: "blue"
      };
      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = {
        info: `An error occured while trying to verify the following email ${
          user.email
        }.`,
        color: "red"
      };
      serverRes(res, 400, msg, null);
    }
  });

  // login a user and create an auth token
  app.post("/api/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const msg = {
        info: "All form fields must be filled in.",
        color: "red"
      };
      serverRes(res, 400, msg, null);
      return;
    }

    if (!isEmail(email)) {
      const msg = {
        info: "The email address you have entered is not a valid email.",
        color: "red"
      };
      serverRes(res, 400, msg, null);
      return;
    }

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        const msg = {
          info: "No user for this email and password.",
          color: "red"
        };
        serverRes(res, 400, msg, null);
        return;
      }

      if (!user.isVerified) {
        const msg = {
          info:
            "Please confirm your email first by following the link in the email.",
          color: "blue"
        };
        serverRes(res, 400, msg, null);
        return;
      }

      const token = await user.generateAuthToken();

      // Success ---------------
      const msg = {
        info: `${user.email} has logged in successfully.`,
        color: "green"
      };
      res
        .header("x-auth", token)
        .status(200)
        .send({ msg, payload: user });
    } catch (err) {
      const msg = {
        info: "An unknown error occured while trying to login.",
        color: "red"
      };
      serverRes(res, 400, msg, null);
      return;
    }
  });

  // logout and remove the auth token
  app.delete("/api/logout", isAuth, async (req, res, next) => {
    // isAuth middleware provides token and user
    const { token, user } = req;

    try {
      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== token);
      await user.save();
      const msg = {
        info: "You were successfully logged out.",
        color: "blue"
      };
      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = {
        info: "An error occured while trying to logout.",
        color: "red"
      };
      return serverRes(res, 400, msg, null);
    }
  });

  // delete an expired token
  app.post("/api/token/:userId", async (req, res, next) => {
    const { userId } = req.params;
    const { token } = req.body;
    try {
      const user = await User.findByToken(token);
      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== token);
      await user.save();

      const msg = {
        info: "The token was deleted.",
        color: "info"
      };
      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = {
        info: "An error occured while deleting the token.",
        color: "red"
      };
      return serverRes(res, 400, msg, null);
    }
  });
};
