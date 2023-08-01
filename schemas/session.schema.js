import Joi from "joi";

const sessionSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.password().required()
})

export default sessionSchema