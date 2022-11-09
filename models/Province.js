const mongoose = require('mongoose')

const ProvinceSchema = new mongoose.Schema({
    id:{
        type: Number
    },
    name_th:{
        type: String
    },
    name_en:{
        type: String
    },
    geography_id:{
        type: Number
    },
})

module.exports = Province = mongoose.model("provinces", ProvinceSchema);