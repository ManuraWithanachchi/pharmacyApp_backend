const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
    code : {
        type : String,
        required : true,
        unique : true
    },
    district_Name : {
        type : String ,
        required : true
    }
});

module.exports = District = mongoose.model("district",DistrictSchema);