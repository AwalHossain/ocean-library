const router = require("express").Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Appointment = require("../model/Appointment");
const ErrorHandler = require("../utils/errorHandler");



// Create appointment

router.post("/createAppointment",  catchAsyncErrors(async (req, res, next) => { 

    console.log(req.body);
    const appointment = await Appointment.create(req.body);
    
    res.status(200).json({
        success: true,
        appointment,
      });

}))


router.get("/getServicId/:email",  catchAsyncErrors(async (req, res, next) => { 0

console.log(req.params.email);

    const appointmenId = await Appointment.find({email: req.params.email})

    res.status(200).json({
        success: true,
        appointmenId,
      });
}))


router.get("/appointId/:email",  catchAsyncErrors(async (req, res, next) => { 0

console.log(req.params.email);

    const appointmenId = await Appointment.findOne({email: req.params.email})

    res.status(200).json({
        success: true,
        appointmenId,
      });
}))


// delete appointmen
router.delete("/deleteAppointment/:id", catchAsyncErrors(async (req, res, next) => {
    
  const service = await Appointment.findByIdAndDelete(req.params.id)
  
  if(!service){
      return next( new ErrorHandler("File is not availble"))
  }
  res.status(200).json({
      success: true,
      message:"Successfully deleted the item",
    });
}))

module.exports = router;