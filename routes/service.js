

const router = require("express").Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Service = require("../model/serviceModel");
const ErrorHandler = require("../utils/errorHandler");
const { route } = require("./user");
const ApiFeatures = require("../utils/apifeature")

// create Service

router.post("/createService",  catchAsyncErrors(async (req, res, next) => {
    const service = await Service.create(req.body);

    res.status(200).json({
        success: true,
        service,
      });
}))


// edit service

router.put("/editService/:id", catchAsyncErrors(async (req, res, next) => { 
    const id = req.params.id;
    console.log(id);
    const service = await Service.findByIdAndUpdate(id, req.body,{runValidators: false})

    // service.save();
    res.status(200).json({
        success: true,
        service,
      });
}))


// delete item
router.delete("/deleteService/:id", catchAsyncErrors(async (req, res, next) => {
    
    const service = await Service.findByIdAndDelete(req.params.id)
    
    if(!service){
        return next( new ErrorHandler("File is not availble"))
    }
    res.status(200).json({
        success: true,
        message:"Successfully deleted the item",
      });
 }))





//  Get all the service with pagination
router.get("/getAllServices/", catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 4;


  const productsCount = await Service.countDocuments();

  const apiFeature = new ApiFeatures(Service.find(), req.query)
    .search()
    .filter();

  let service = await apiFeature.query;


  apiFeature.pagination(resultPerPage);

  service = await apiFeature.query;

res.status(200).json({
    success: true,
service ,
resultPerPage,
productsCount

});

}))


// Get service by id
router.get("/service/:id", catchAsyncErrors(async (req, res, next) => {

  const service = await Service.findById(req.params.id);

  res.status(200).json({
    success: true,
    service
  });

}))


module.exports = router;