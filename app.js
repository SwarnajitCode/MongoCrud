const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user.router')
app.use(express.json());

app.use("/",userRouter);

mongoose.connect("mongodb://localhost:27017/users")
const con = mongoose.connection;

con.on('open', ()=>{
    console.log('db connnected');
})

app.listen(3000, ()=>{
    console.log("running on port 3000");
})
