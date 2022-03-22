const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    title:{
        type: String
    },
    desc:{
        type: String
    },
    available:{
        type: String
    },
    time:{
        type: String
    },
    cost:{
        type: String
    },
    img:{
        type: String
    }

})



module.exports = mongoose.model('services', serviceSchema)