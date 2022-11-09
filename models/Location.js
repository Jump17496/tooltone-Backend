const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    title:{
        type: String
    },
    tel:{
        type: String
    },
    address:{
        type: String
    },
    province:{
        type: String
    },
    amphure:{
        type: String
    },
    district:{
        type: String
    },
    postcode:{
        type: String
    },
},{timestamps:true})

module.exports = Location = mongoose.model("locations", LocationSchema);