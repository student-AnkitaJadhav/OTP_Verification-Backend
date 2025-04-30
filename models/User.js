const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },

    email : {
        type:String,
        required : true
    },

    password:{
        type:String,
        required:true
    },

    otp: {
        type: String,
        required: function() { return !this.isVerified; }, // Make `otp` required only if the user is not verified
    },
    otpExpiry: Date,
    isVerified: {
        type: Boolean,
        default: false
    },

    isVerified:{
        type:Boolean,
        default:false
    }
});

const User = mongoose.model("User",UserSchema);

module.exports = User;