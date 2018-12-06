const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({

    user_Name:{
        type: String,
        unique: true,
        required: true,
        min: [4, "Name is too short, it has to be at least 4 characters long"],
        max: [25, "Name is too long, it has to be shorter than 26 characters"]
    },
    account_Id: Schema.Types.ObjectId,
    name:{
        type: String,
        required: true,
    },
    birth_Date:{
        type: Date,
        required: true
    },
    first_Name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Login", loginSchema);