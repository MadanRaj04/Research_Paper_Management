const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
{
    username : String,
    email : {type:String, required: true, trim: true, lowercase: true, unique:true},
    password : {type:String,required: true},
    role: {type:String, enum: ['admin', 'editor', 'user'], default:"user"},
    details : {
        phone : {type:String},
        address : {type:String},
        city : {type:String},
        state : {type:String},
        country : {type:String},
        pincode : {type:String}
    }
}
)

const User = mongoose.model("User", UserModel);
module.exports = User;