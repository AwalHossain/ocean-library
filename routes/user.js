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
    res.status(200).json({
      success: true,
      user,
    });
  })
);



// Login user
router.get(
  "/getAdmin/:email",
  catchAsyncErrors(async (req, res, next) => {

    const isAdmin = await User.findOne({email:req.params.email}).distinct("isAdmin")

    res.status(200).json({
      success: true,
      isAdmin,
    });
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
