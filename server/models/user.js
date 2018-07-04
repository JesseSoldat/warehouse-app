const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { errRes } = require("../utils/serverResponses");

const tokenExpirationTime = 604800;

const UserSchema = new Schema({
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
  ]
});

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
    next(errRes("Password has not been modified"));
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
