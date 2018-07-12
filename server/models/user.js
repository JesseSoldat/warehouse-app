const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { milliFromNow, daysFromNow } = require("../utils/timeHelpers");

const tokenExpirationTime = 30 * 1000; // 30 seconds TESTING
const tokenExpirationDays = 7; // 7 days; USE this for real token
const verificationExpirationTime = 43200; // 12 hours

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email"
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          expires: tokenExpirationTime
        }
      }
    ],
    isVerified: { type: Boolean, default: false },
    verificationToken: {
      token: { type: String },
      createdAt: {
        type: Date,
        default: Date.now(),
        expires: verificationExpirationTime
      }
    }
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  const {
    username,
    email,
    _id,
    tokens,
    verificationToken,
    isVerified
  } = userObj;
  return { username, email, _id, tokens, verificationToken, isVerified };
};

UserSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  try {
    const user = await User.findOne({ email });

    if (!user) return null;

    const match = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, matched) => {
        matched ? resolve(user) : resolve(null);
      });
    });

    return match;
  } catch (err) {
    return null;
  }
};

UserSchema.methods.generateAuthToken = async function() {
  const user = this;

  const { _id, tokens } = user;

  const access = "auth";

  // - Token expiration time by milliseconds OR days -
  //const expires = milliFromNow(tokenExpirationTime); // TESTING TOKEN
  const expires = daysFromNow(new Date(), tokenExpirationDays);

  const token = jwt
    .sign(
      {
        _id: _id.toHexString(),
        access,
        expires
      },
      process.env.TOKEN_SECRET
    )
    .toString();

  // remove the first token
  if (tokens.length > 5) {
    user.tokens.shift();
  }
  tokens.push({
    access,
    token
  });

  try {
    await user.save();
    return token;
  } catch (err) {
    return err;
  }
};

UserSchema.statics.findByToken = async function(token) {
  const User = this;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log("findByToken -- decodedToken", decodedToken);

    return User.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
      "tokens.access": "auth"
    });
  } catch (err) {
    return null;
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
