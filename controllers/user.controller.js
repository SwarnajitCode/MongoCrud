const Users = require("../models/user.model")
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const express = require('express');
require ('dotenv').config();
const {signupSchema} = require("../middlewares/joi_validation");
const app = express();


module.exports = {
    getUsers : async(req,res) => {
        try {
            const users = await Users.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({error:"something wenr wrong"});
        }
    },

    createUser : async(req,res) => {
        const {error,value} = signupSchema.validate(req.body);
        if(error){
            res.status(500).json({error:"Invaliid request"})
        }else{
        const user = new Users({
            name:req.body.name,
            age:req.body.age,
            password:req.body.password
        })
        const hash = await bcrypt.hash(user.password,10);
        user.password = hash;
        try {
            const a = await user.save();
            res.json(a);
            
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }}
    },

    getOneUser : async(req,res) =>{

        try {
            const user = await Users.findById(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(500).json({error:"something went wrong"});
        }
    },

    updateUser : async(req,res) => {
        try{
            const user = await Users.findById(req.params.id);
            user.name = req.body.name;
            user.age = req.body.age;
            const user2 = await user.save();
            res.json(user2);

        }catch(err){

            res.status(500).json({error:"something went wrong"})
        }
    },

    deleteUser : async(req,res) =>{
        try {
            const user = await Users.findByIdAndDelete(req.params.id);
            res.json(user);
            
        } catch (err) {

            res.status(500).json({error:"sommething went wrong"});
            
        }
    },

    findMaxAge : async(req,res) =>{
        try {

            const user = await Users.find({}).sort({age:-1}).limit(1);
            res.json(user);
            
        } catch (err) {

            res.status(500).json({error:"something went wrong"});
            
        }
    },

    findMinAge : async(req,res) => {
        try {

            const user = await Users.find({}).sort({age:1}).limit(1);
            res.json(user);
            
        } catch (err) {

            res.status(500).json({error:"something went wrong"});
            
        }
    },

    login : async(req,res) => {
        
        password = req.body.password;
        try {
            const user = await Users.findById(req.body.id);
            const result =  bcrypt.compareSync(password,user.password);
            if(result){
                const token = sign({result:user},process.env.SECRET_KEY);
                res.json(token);
            }else{res.status(400).json({message:"wrong credentials"});}

        } catch (err) {
            console.log(err);

            res.status(500).json({error:"something went wrong"});
            
        }

    }
}