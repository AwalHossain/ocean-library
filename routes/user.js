const router = require("express").Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel")
const sendToken = require("../utils/jwtToken");

const jwt = require("jsonwebtoken");
// const jobSeeker = require("");

// Job Seeker Registration & Login
router.post(
  "/registerUser",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    // const { name, email, password, firstName } = req.body;
    const user = await User.create(req.body);
 sendToken(user, 200, res);
  })
);

// Login user
router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    console.log(email, password, "haldsl");
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid  password", 401));
    }

    sendToken(user, 200, res);
  })
);

//// Get user details
router.get("/getCookie", async (req, res, next) => {
  const access_token = req.headers['authorization'];
  // const {access_token} = await req.cookies;
  console.log(access_token, " this ms is access token");
  // console.log(mbil, " localoken");
  if(access_token == "null"){
    console.log("work");
     return next(new ErrorHandler("Local nulle", 401));
  }
  if (!access_token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(access_token, process.env.JWT_SECRET);
  console.log(decodedData.id);
  req.user = (decodedData.id);
  console.log(req.user, "way");
  const id = req.user;
  let user = await User.findById({_id: id});
  if(user === null){
    user = await Employer.findById({_id: id});
  }
  console.log("heloa", user);

  res.status(200).json({
    success: true,
    user,
  });
});


// Get User by id
router.get(
  "/jobSeeker/:id",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.user, "way");
    const user = await User.findById(req.params.id);
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);
// Get User by Email
router.get(
  "/jobSeeker/findbyemail/:email",
  catchAsyncErrors(async (req, res, next) => {
    const mail = req.params.email;
    const user = await User.findOne({ email: mail });
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);

// employer Registration & login
// router.get(
//   "/jobSeeker/me",
//   isAuthenticatedUser,
//   catchAsyncErrors(async (req, res, next) => {
//     console.log(req.user, "way");
//     const user = await jobSeeker.findById(req.user.id);
//     console.log("heloa", user);

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   })
// );

router.post(
  "/register/employer",
  catchAsyncErrors(async (req, res, next) => {
    console.log("hello");

    const { name, email, password, firstName } = req.body;
    const user = await Employer.create(req.body);
 sendToken(user, 200, res);
  })
);

// Login employer
router.post(
  "/employer/login",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    console.log(email, password, "haldsl");
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await Employer.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid  password", 401));
    }

    sendToken(user, 200, res);
  })
);

// Get User by id
router.get(
  "/employer/:id",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.user);
    const user = await Employer.findById(req.params.id);
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);
// Get Employer by Email
router.get(
  "/employer/findbyemail/:email",
  catchAsyncErrors(async (req, res, next) => {
    const mail = req.params.email;
    // console.log(email);
    const user = await Employer.findOne({ email: mail });
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);

// logOut user

router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    res.cookie("access_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    log
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  })
);

// Forgot Password

module.exports = router;
