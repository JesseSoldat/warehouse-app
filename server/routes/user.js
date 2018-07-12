const crypto = require("crypto");

// models
const User = require("../models/user");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { errMsg, msgObj, serverRes } = require("../utils/serverRes");
const serverMsg = require("../utils/serverMsg");
const sendMail = require("../utils/sendMail");
const isEmail = require("../utils/isEmail");

module.exports = app => {
  // user auth ----------------------------------------------------
  // register a user and send verification email
  app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      const msg = serverMsg("allFields");
      return serverRes(res, 400, msg, null);
    }

    if (!isEmail(email)) {
      const msg = serverMsg("isEmail");
      return serverRes(res, 400, msg, null);
    }

    if (password.length < 6) {
      const msg = serverMsg("passwordLength");
      return serverRes(res, 400, msg, null);
    }

    try {
      const haveUser = await User.findOne({ email });

      if (haveUser) {
        const msg = serverMsg("haveUser");
        return serverRes(res, 400, msg, null);
      }

      const user = new User({ username, email, password });

      // Email verification token
      const verificationToken = crypto.randomBytes(16).toString("hex");
      user["verificationToken"].token = verificationToken;
      user["role"] = "user";

      await user.save();
      await sendMail(req, user, verificationToken, (type = "confirm"));

      const msg = msgObj(
        `A verification email has been sent to ${user.email}.`,
        "blue"
      );
      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = serverMsg("error", "register", "user");
      serverRes(res, 400, msg, null);
    }
  });

  // login a user and create an auth token
  app.post("/api/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const msg = serverMsg("allFields");
      return serverRes(res, 400, msg, null);
    }

    if (!isEmail(email)) {
      const msg = serverMsg("isEmail");
      return serverRes(res, 400, msg, null);
    }

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        const msg = serverMsg("noUser");
        return serverRes(res, 400, msg, null);
      }

      if (!user.isVerified) {
        const msg = msgObj(
          "Please confirm your email first by following the link in the email.",
          "blue"
        );
        return serverRes(res, 400, msg, null);
      }

      const token = await user.generateAuthToken();

      const msg = msgObj(`${user.email} has logged in successfully.`, "green");
      res
        .header("x-auth", token)
        .status(200)
        .send({ msg, payload: user });
    } catch (err) {
      const msg = serverMsg("error", "login", "user");
      serverRes(res, 400, msg, null);
    }
  });

  // logout and remove the auth token
  app.delete("/api/logout", isAuth, async (req, res, next) => {
    // isAuth middleware provides token and user
    const { token, user } = req;

    try {
      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== token);
      await user.save();

      const msg = msgObj("You were successfully logged out.", "blue");
      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = serverMsg("error", "logout", "user");
      return serverRes(res, 400, msg, null);
    }
  });
  // send mail ----------------------------------------------------
  // verify user with sent email
  app.get("/api/confirmation/:token", async (req, res, next) => {
    const { token } = req.params;
    try {
      if (!token) throw new Error();

      const user = await User.findOne({ "verificationToken.token": token });

      if (!user) throw new Error();

      // If user is already verified redirect
      if (user.isVerified) {
        return res.redirect("/login?verify=true");
      }

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
      const msg = serverMsg("isEmail");
      return serverRes(res, 400, msg, null);
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        const msg = serverMsg("noUser");
        return serverRes(res, 400, msg, null);
      }

      if (user.isVerified) {
        const msg = serverMsg("isVerified");
        return serverRes(res, 400, msg, null);
      }

      // Create a verification token, save it, and send email
      const verficationToken = crypto.randomBytes(16).toString("hex");
      user["verificationToken"].token = verficationToken;
      await user.save();

      await sendMail(req, user, verficationToken, (type = "confirm"));

      const msg = msgObj(
        `A verification email has been sent to ${user.email}.`,
        "blue"
      );
      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = msgObj(
        `An error occured while trying to verify the following email ${
          user.email
        }.`,
        "red"
      );
      serverRes(res, 400, msg, null);
    }
  });

  // admin ----------------------------------------------
  // get all of the users of the app
  app.get("/api/users", isAuth, async (req, res) => {
    try {
      const users = await User.find({});
      serverRes(res, 200, null, users);
    } catch (err) {
      const msg = serverMsg("error", "fetch", "users");
      return serverRes(res, 400, msg, null);
    }
  });

  // delete an expired token
  app.post("/api/token", async (req, res) => {
    const { token } = req.body;
    try {
      const user = await User.findByToken(token);

      if (!user) {
        const msg = serverMsg("noUser");
        return serverRes(res, 400, msg, null);
      }

      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== token);
      await user.save();

      const msg = msgObj("The token was deleted.", "blue");
      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = serverMsg("error", "delete", "token");
      return serverRes(res, 400, msg, null);
    }
  });
};
