const books = require('../models/book.model');

module.exports = {
    createBook : async(req,res) =>{
        const book = new books({
            userId:req.body.userId,
            name:req.body.name,
            pages:req.body.pages
        })
try {
    const result = await book.save();
    res.json(result);

} catch (err) {
    res.status(500).json({error:"something went wrong"});
}    },

    getAllBooks : async(req,res) =>{
        try {
            const book = await books.find();
            res.json(book);
            
        } catch (err) {
            res.status(500).json({error:"something went wrong"});
        }
    },

    getOneBook : async(req,res) =>{
        try {
            const book = await books.find({_id:req.params.id}).populate({path:"userId", select:['name','age']});
            res.json(book);
            
        } catch (err) {
            console.log(err);
            res.status(500).json({error:"something went wrong"});
        }
    } 
    
}