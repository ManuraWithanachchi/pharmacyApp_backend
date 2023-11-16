const mongoose = require('mongoose');

const MedicalCenterSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    owner_name : {
        type : String,
        required : true
    },
    medical_center_registration_No : {
        type : String,
        required : true,
        unique : true
    },
    owner_nic : {
        type : String,
        required : true,
        unique : true
    },
    district_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "district",
        required : true
    },
    address : {
        type : String,
        required: true
    },
    contact_No_Landline : {
        type : String,
        required : true,
    },
    contact_No_Mobile : {
        type : String, 
        required : true
    },
    logoURL :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "image",
        required : true
    } ,
    RegisterCertificateImageURL : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "image",
        required : true
    },
    medicalCenterRating : {
        properties : {
            rate : { type : Number, default : 0},
            TotalNumOfRatings : { type : Number , default : 0 }   // rate = ( rate + givenRate ) / totalNumOfRatings
        }
    },
    password: {
        type : String,
        required : true
    },
    business_email : {
        type: String,
        required : true,
        unique : true
    }
    
});

module.exports = MedicalCenter = mongoose.model("medical_center",MedicalCenterSchema);