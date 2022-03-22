const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter you email"],
      unique: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
      minlength: [6, "password should be six character long"],
      select: false,
    },

  },
  { timestamps: true }
);


//Jwt token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
};

//Compare password


//Reset Password


module.exports = mongoose.model("users", userSchema);
