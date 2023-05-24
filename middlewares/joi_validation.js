const Joi = require("joi");

module.exports = {
    signupSchema : Joi.object({
        name:Joi.string().required(),
        age:Joi.number().required(),
        password:Joi.string().min(3).max(10).required(),
    })
}