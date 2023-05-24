const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    name:{
        type:String,
        required:true
    },
    pages:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('Books',BookSchema);
