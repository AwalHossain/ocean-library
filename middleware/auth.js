const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
// const errorMiddleware = require("./middleware/error");


exports.isAuthenticatedEmployer = catchAsyncErrors(async (req, res, next) => {
 const authHeader = req.headers['authorization'];
  const access_token = authHeader ;
  console.log("helo from authe employ");
    // const {access_token} = await req.cookies;
  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodeData = jwt.verify(access_token, process.env.JWT_SECRET);
  console.log(decodeData);
req.user = await Employer.findById( decodeData.id);
  // console.log(mig);
  next();
});
exports.isAuthenticatedSeeker = catchAsyncErrors(async (req, res, next) => {
 const authHeader = req.headers['authorization'];
  const access_token = authHeader ;
  console.log("heloo");
    // const {access_token} = await req.cookies;
  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodeData = jwt.verify(access_token, process.env.JWT_SECRET);
  console.log(decodeData);
req.user = await User.findById( decodeData.id);
  // console.log(mig);
  next();
});

exports.authrizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
