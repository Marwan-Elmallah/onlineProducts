const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:           {type: String , required: true},
    privleage:      {type: Number , required: true},
    password:       {type: String , required: true},
    username:       {type: String , required: true},
    Mobile:         {type: String , required: true},
    createdAt:      {type: Date , default: Date.now}
})

const user = mongoose.model("user",userSchema)

module.exports = user;


/*
Privelages:
    1 : Admin
    2 : Manger
    3 : User
*/


/*
    we use bcrypt library to hash data(password)
*/