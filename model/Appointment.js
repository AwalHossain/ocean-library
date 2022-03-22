const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema({
    name:{
        type: String
    },
    title:{
        type: String
    },
    time:{
        type: String
    },
    displayName:{
        type: String
    },
    email:{
        type: String
    },
    date:{
        type: String
    },
    confirm:{
        type: String
    },
    cost:{
        type: String
    },
    serviceId:{
        type: String
    },
    number:{
        type: String
    }

})



module.exports = mongoose.model('appointment', appointSchema)