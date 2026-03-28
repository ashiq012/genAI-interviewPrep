const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:[true,"User already exist"]
    },
    email:{
        type:String,
        require:true,
        unique:[true,"email already exist"]
    },
    password:{
        type:String,
        require:true,
    },

})
const userModel = mongoose.model("users",userSchema)
module.exports = userModel