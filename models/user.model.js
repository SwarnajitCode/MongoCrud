const mongoose = require('mongoose');
const Users = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Users',Users);