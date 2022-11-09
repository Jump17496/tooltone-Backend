const mongoose = require('mongoose')

const AmphureSchema = new mongoose.Schema({
    id:{
        type: Number
    },
    name_th:{
        type: String
    },
    name_en:{
        type: String
    },
    province_id:{
        type: Number
    },
})

module.exports = Amphure = mongoose.model("amphures", AmphureSchema);