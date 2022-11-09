const mongoose = require('mongoose')

const DistrictSchema = new mongoose.Schema({
    id:{
        type: Number
    },
    zip_code:{
        type: Number
    },
    name_th:{
        type: String
    },
    name_en:{
        type: String
    },
    amphure_id:{
        type: Number
    },
})

module.exports = District = mongoose.model("districts", DistrictSchema);