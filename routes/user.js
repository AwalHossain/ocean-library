const router = require("express").Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel")
const sendToken = require("../utils/jwtToken");
const Review = require("../model/userReview.js")



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



router.post("/review",catchAsyncErrors(async (req, res, next) => {

  const review = await Review.create(req.body);

  res.status(200).json({
    success: true,
    review,
  });

}))


router.get("/getReview", catchAsyncErrors(async (req, res, next) => {
  const review = await Review.find({isApprove: true});


  res.status(200).json({
    success: true,
    review,
  });
}))





// Forgot Password

module.exports = router;
