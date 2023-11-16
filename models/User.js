const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    }, 
    nic : {
        type   : String,
        required: true,
        unique:true
    },
    userRole: {
        type : String,
        required : true,
        default : "Patient"
    },
    email : {
        type: String,
        required : true,
        unique : true
    }, 
    mobile : {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    }, 
    resetString : {
        type : String,
        default : null
    },
    resetStringTime : {
        type : Date
    },
    date : {
        type : Date,
        default : Date.now
    },
    desease : {
        type : Array
    }
});

module.exports = User = mongoose.model("user", UserSchema);