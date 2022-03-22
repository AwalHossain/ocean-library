const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    email:{
        type: String,
    },
    desc:{
        type: String,
    },
    rating:{
        type: Number
    },
    isApprove:{
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model("review", reviewSchema);