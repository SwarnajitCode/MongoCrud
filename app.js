const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user.router')
require ('dotenv').config();
app.use(express.json());

app.use("/",userRouter);

mongoose.connect(process.env.DBURL)
const con = mongoose.connection;

con.on('open', ()=>{
    console.log('db connnected');
})

app.listen(process.env.PORT, ()=>{
    console.log("running on port : ",process.env.PORT );
})
