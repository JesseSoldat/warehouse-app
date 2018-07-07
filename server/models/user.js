const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { errRes } = require("../utils/serverResponses");

const tokenExpirationTime = 604800; // 7 days;
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
        if (err) next(errRes("Could not hash the password"));
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
    console.log(match);

    return match;
  } catch (err) {
    return null;
  }
};

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access
      },
      process.env.TOKEN_SECRET
    )
    .toString();

  // remove the first token
  if (user.tokens.length > 5) {
    user.tokens.shift();
  }
  user.tokens.push({
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
    return User.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
      "tokens.access": "auth"
    });
  } catch (err) {
    return Promise.reject(
      errRes("There was an error while authenticating the user")
    );
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
