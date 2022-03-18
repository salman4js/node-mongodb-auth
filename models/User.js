const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
}, {timestamps : true })

const User = mongoose.model("user", userSchema);

module.exports = User