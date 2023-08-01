import Joi from "joi";

//REAVER ESSE SCHEMA

const urlSchema = Joi.object({
    shortUrl: Joi.uri().required(),
    url: Joi.uri().required()
})

export default urlSchema