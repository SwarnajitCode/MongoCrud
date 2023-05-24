const {verify} = require("jsonwebtoken");
require ('dotenv').config();


module.exports = {

    checkToken : (req,res,next) => {
        console.log("coming here");

        token = req.get('authorization');

        if(token){
            token = token.slice(7);
            verify(token,process.env.SECRET_KEY,(err,decoded) =>{
                if(err){
                    res.status(500).json({error:"Invalid Token"});
                }else{
                    next();
                }
            })
        }else{
            res.status(500).json({error:"Access Denied"});
        }

    }
}